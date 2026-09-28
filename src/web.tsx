import { forwardRef, type InputHTMLAttributes, type PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  snap?: number;
}>;

export function BottomSheet({ open, onOpenChange, title, description, children }: BottomSheetProps) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal>{open&&<><Dialog.Overlay className="sheet-overlay"/><Dialog.Content className="bottom-sheet"><div className="sheet-handle-zone"><div className="sheet-handle"/></div><div className="sheet-header"><Dialog.Title className="sheet-title">{title}</Dialog.Title>{description&&<Dialog.Description className="sheet-description">{description}</Dialog.Description>}</div><div className="sheet-content">{children}</div><Dialog.Close className="sheet-close" aria-label="Close">×</Dialog.Close></Dialog.Content></>}</Dialog.Portal></Dialog.Root>;
}

export const KeyboardInput=forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>((props,ref)=><input ref={ref} {...props}/>);
KeyboardInput.displayName="KeyboardInput";
export function useKeyboard(){ return { hide:()=>undefined }; }
export function MobileScroll({className,children}:PropsWithChildren<{className?:string}>){ return <section className={`web-scroll ${className??""}`}>{children}</section>; }
