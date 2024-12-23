"use client";

import "./styles.css";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ModalContent,
  TwoStepModal,
} from "../components/dialog";
import { User, Gift, ArrowLeft, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-[hsl(230,10.34,11.37)]">
      <TwoStepModal trigger={<FeyButton />}>
        <FirstStep />
        <SecondStep />
      </TwoStepModal>
    </main>
  );
}

const FeyButton = () => (
  <div className="w-[90vw] sm:w-[40rem] h-20 bg-[hsl(230,13.64,8.63)] rounded-xl flex items-center px-6 gap-x-4">
    <div className="bg-[hsl(13.33,18.75,18.8)] size-7 rounded-lg flex justify-center items-center">
      <User size={20} strokeWidth={1.5} color="#ffa16b" />
    </div>
    <div className="text-sm text-white text-left font-calibre">
      <p className="font-semibold">Treezy</p>
      <p className="text-[#868f97]">ads@qiwi.gg</p>
    </div>
  </div>
);

const FirstStep = ({ nextStep }: { nextStep?: () => void }) => (
  <ModalContent className="h-full flex items-center justify-center gap-y-7">
    <DialogHeader>
      <DialogTitle>
        <span className="font-semibold text-2xl">Treezy</span>
      </DialogTitle>
      <DialogDescription>
        <span className="text-[#868f97] font-semibold ">ads@qiwi.gg</span>
      </DialogDescription>
    </DialogHeader>

    <button
      onClick={nextStep}
      className="bg-[#171b1a] flex items-center gap-x-2 rounded-full px-4 py-[0.6rem] size-fit"
    >
      <Gift strokeWidth={1.5} size={16} />
      <span className="text-xs font-semibold">Refer a friend</span>
    </button>

    <button
      onClick={nextStep}
      className="border border-[#171b1a] flex items-center gap-x-2 rounded-lg px-4 py-[0.6rem] size-fit"
    >
      <ArrowRight strokeWidth={1.5} size={16} />
      <span className="text-xs font-semibold">Next Step</span>
    </button>
  </ModalContent>
);

const SecondStep = ({ previousStep }: { previousStep?: () => void }) => (
  <ModalContent className="bg-[#07070a] h-fit p-0">
    <DialogHeader className="px-6 py-3">
      <DialogTitle className="flex justify-between">
        <span className="bg-[#1a1b20] px-5 py-1 rounded-[3px] text-[0.6rem] text-[#868f97]">
          Settings
        </span>
        <button
          className="flex items-center gap-x-1 text-xs"
          onClick={previousStep}
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </button>
      </DialogTitle>
      <DialogDescription className="size-0">&nbsp;</DialogDescription>
    </DialogHeader>

    <div className="px-6">
      <input
        type="text"
        placeholder="email address"
        className="bg-transparent text-2xl py-3 text-white font-light focus:outline-none placeholder:text-white/10 caret-blue-500"
      />
    </div>

    <DialogFooter className="flex sm:justify-start items-center gap-x-2 px-7 py-8 border-t border-t-gray-500/20">
      <Gift size={16} strokeWidth={1.5} color="#868f97" />
      <p className="text-xs text-[#868f97]">
        Give a friend a <span className="text-white">free month </span>
        and earn one when they join Fey.
      </p>
    </DialogFooter>
  </ModalContent>
);
