import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function worker(windows=[]){
  const handlers={},queued=[],shown=[],opened=[];
  const indexedDB={open(){const request={};queueMicrotask(()=>{
    request.result={close(){},transaction(){const tx={objectStore(){return {add(value){queued.push(value);queueMicrotask(()=>tx.oncomplete());}}}};return tx;}};
    request.onsuccess();
  });return request;}};
  const self={addEventListener(type,handler){handlers[type]=handler;},registration:{scope:'https://plan-it.example/',async showNotification(title,options){shown.push({title,...options});}},clients:{async matchAll(){return windows;},async openWindow(url){opened.push(url);}}};
  vm.runInNewContext(readFileSync(new URL('../public/sw.js',import.meta.url),'utf8'),{self,indexedDB,URL,Date});
  async function click(action){let done;handlers.notificationclick({action,notification:{tag:'plan-it-focus',title:'Focus: Write proposal',data:{taskId:'task-1'},close(){}},waitUntil(promise){done=promise;}});await done;}
  return {click,queued,shown,opened};
}
test('pause and resume persist even with no app window, updating notification controls',async()=>{
  const w=worker();await w.click('pause');await w.click('resume');
  assert.deepEqual(w.queued.map(item=>item.action),['pause','resume']);
  assert.equal(w.queued[0].taskId,'task-1');assert.ok(w.queued[0].at>0);
  assert.equal(w.shown[0].actions[0].action,'resume');assert.equal(w.shown[1].actions[0].action,'pause');
  assert.equal(w.opened.length,0);
});
test('stop persists without reopening or recreating the notification',async()=>{
  const w=worker();await w.click('stop');assert.equal(w.queued[0].action,'stop');assert.equal(w.shown.length,0);assert.equal(w.opened.length,0);
});
test('notification body focuses app and requests full focus view',async()=>{
  const messages=[];let focused=false;
  const w=worker([{url:'https://plan-it.example/',postMessage(message){messages.push(message);},async focus(){focused=true;}}]);
  await w.click('');assert.equal(focused,true);assert.ok(messages.some(message=>message.action==='open'));
});
test('notification body opens app with focus route when app is closed',async()=>{
  const w=worker();await w.click('');assert.equal(w.opened[0],'https://plan-it.example/?focusAction=open');
});
