"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

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

// =====================================================================
// =====================================================================
// ============ CUSTOM DIALOG: TWO-STEPS MODAL==========================
// =====================================================================
type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  previousStep?: () => void;
  nextStep?: () => void;
};
const ModalContent = ({ className, children }: ModalContentProps) => (
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
ModalContent.displayName = "ModalContent";

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

type TwoStepModalProps = {
  trigger: React.ReactNode;
  children: React.ReactElement<ModalContentProps>[];
};
const TwoStepModal: React.FC<TwoStepModalProps> = ({ trigger, children }) => {
  const steps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        nextStep: nextStep,
        previousStep: previousStep,
      });
    }
  });
  const firstModal = steps[0];
  const secondModal = steps[1];

  const [showFirstDialog, setShowFirstDialog] = React.useState(true);
  const [isFirstDialogOpen, setIsFirstDialogOpen] = React.useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = React.useState(false);

  function previousStep() {
    setIsSecondDialogOpen(false);
    setIsFirstDialogOpen(true);
  }

  function nextStep() {
    setShowFirstDialog(false);
    setIsSecondDialogOpen(true);

    setTimeout(() => {
      setIsFirstDialogOpen(false);
      setShowFirstDialog(true);
    }, 100);
  }

  const closeDialog = () => {
    setIsFirstDialogOpen(false);
    setIsSecondDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>

        {showFirstDialog && (
          <CustomDialogContent
            onClick={closeDialog}
            className="data-[state=open]:animate-[xyz-scale-in_150ms_ease-out] data-[state=closed]:animate-[xyz-fade-out_150ms_ease-out] font-calibre"
          >
            {firstModal}
          </CustomDialogContent>
        )}
      </Dialog>

      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <CustomDialogContent
          onClick={closeDialog}
          className="data-[state=open]:animate-[xyz-bounce-in_150ms_ease-out] data-[state=closed]:animate-[xyz-fade-out_150ms_ease-out] font-calibre"
        >
          {secondModal}
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
  ModalContent,
  TwoStepModal,
};
