"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Gift } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const ModalContent = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-black flex flex-col gap-y-2.5 text-white rounded-lg p-6 shadow-xl",
      className
    )}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);
ModalContent.displayName = "DialogInnerContent";

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className="opacity-0" />

    <DialogPrimitive.Content
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-0 p-0 bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        "max-w-[712px] h-[420px]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================

const TwoStepModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = React.useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = React.useState(false);

  const switchDialogs = () => {
    setIsFirstDialogOpen(false);
    setIsSecondDialogOpen(true);
  };

  const closeDialog = () => {
    setIsFirstDialogOpen(false);
    setIsSecondDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>

        <CustomDialogContent
          onClick={closeDialog}
          className="data-[state=open]:animate-[scale-in_150ms_ease-out] font-calibre"
        >
          <ModalContent className="h-[420px] flex items-center justify-center gap-y-7">
            <DialogHeader>
              <DialogTitle>
                <span className="font-semibold text-2xl">Treezy</span>
              </DialogTitle>
              <DialogDescription>
                <span className="text-[#868f97] font-semibold ">
                  ads@qiwi.gg
                </span>
              </DialogDescription>
            </DialogHeader>

            <button
              onClick={switchDialogs}
              className="bg-[#171b1a] flex items-center gap-x-2 rounded-full px-4 py-[0.6rem] size-fit"
            >
              <Gift strokeWidth={1.5} size={16} />
              <span className="text-xs font-semibold">Refer a friend</span>
            </button>
          </ModalContent>
        </CustomDialogContent>
      </Dialog>

      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <CustomDialogContent
          onClick={closeDialog}
          className="animate-[bounce-in_150ms_ease-out] font-calibre"
        >
          <ModalContent className="bg-[#07070a] h-[200px] p-0">
            <DialogHeader className="px-6 py-3">
              <DialogTitle>
                <span className="bg-[#1a1b20] px-5 py-1 rounded-[3px] text-[0.6rem] text-[#868f97]">
                  Settings
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="px-6">
              <input
                type="text"
                placeholder="email address"
                className="bg-transparent text-2xl py-3 text-white font-light focus:outline-none placeholder:text-white/10 caret-blue-500"
              />
            </div>

            <DialogFooter className="flex sm:justify-start items-center gap-x-2 px-7 py-8 border-t border-t-gray-500/20">
              <Gift strokeWidth={1.5} size={16} color="#868f97" />
              <p className="text-xs text-[#868f97]">
                Give a friend a <span className="text-white">free month </span>
                and earn one when they join Fey.
              </p>
            </DialogFooter>
          </ModalContent>
        </CustomDialogContent>
      </Dialog>
    </>
  );
};

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  TwoStepModal as TwoStepModal,
};
