"use client";

import { MainNavigation } from "@/components/MainNavigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-[100svh] md:h-screen w-screen bg-[#0F0F0F] text-white overflow-y-scroll flex flex-col">
      <MainNavigation />
      <div className="grow px-6 lg:px-16">{children}</div>
    </div>
  );
}
