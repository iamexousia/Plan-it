const CACHE="plan-it-v5";
const SHELL=["/","/manifest.webmanifest","/plan-it-icon.png","/favicon.png","/plan-it-logo.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")event.waitUntil(self.skipWaiting());});
self.addEventListener("activate",event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("/"))))});
function queueFocusAction(action,taskId){return new Promise((resolve,reject)=>{const request=indexedDB.open("plan-it-focus-actions",1);request.onupgradeneeded=()=>request.result.createObjectStore("actions",{autoIncrement:true});request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,tx=db.transaction("actions","readwrite");tx.objectStore("actions").add({action,taskId,at:Date.now()});tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error);};};});}
self.addEventListener("notificationclick",event=>{
  const action=event.action||"open",notification=event.notification;
  notification.close();
  event.waitUntil((async()=>{
    const isFocus=notification.tag==="plan-it-focus";
    if(isFocus){
      await queueFocusAction(action,notification.data?.taskId);
      if(action==="pause"||action==="resume")await self.registration.showNotification(notification.title,{body:action==="pause"?"Timer paused · Resume when you’re ready.":"Timer running · Use the controls below to pause or stop.",icon:notification.icon,badge:notification.badge,tag:notification.tag,silent:true,requireInteraction:true,data:notification.data,actions:[{action:action==="pause"?"resume":"pause",title:action==="pause"?"Resume":"Pause"},{action:"stop",title:"Stop"}]});
    }
    const windows=(await self.clients.matchAll({type:"window",includeUncontrolled:true})).filter(client=>client.url.startsWith(self.registration.scope));
    const existing=windows.find(client=>client.focused)||windows.find(client=>client.visibilityState==="visible")||windows[0];
    if(isFocus)windows.forEach(client=>client.postMessage({type:"FOCUS_ACTION",action}));
    if(!isFocus||action==="open"){
      if(existing){await existing.focus();if(isFocus)existing.postMessage({type:"FOCUS_ACTION",action:"open"});}
      else await self.clients.openWindow(new URL(isFocus?"?focusAction=open":"",self.registration.scope).href);
    }
  })());
});
