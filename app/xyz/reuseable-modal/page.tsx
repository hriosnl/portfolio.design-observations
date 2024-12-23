"use client";
import "./styles.css";

import { TwoStepModal } from "../components/dialog";
import { User } from "lucide-react";

export default function Page() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-[hsl(230,10.34,11.37)]">
      <TwoStepModal trigger={<FeyButton />} />
    </main>
  );
}

const FeyButton = () => (
  <div className="w-[40rem] h-20 bg-[hsl(230,13.64,8.63)] rounded-xl flex items-center px-6 gap-x-4">
    <div className="bg-[hsl(13.33,18.75,18.8)] size-7 rounded-lg flex justify-center items-center">
      <User size={20} strokeWidth={1.5} color="#ffa16b" />
    </div>
    <div className="text-sm text-white text-left font-calibre">
      <p className="font-semibold">Treezy</p>
      <p className="text-[#868f97]">ads@qiwi.gg</p>
    </div>
  </div>
);
