"use client";

import { MainNavigation } from "@/components/MainNavigation";
import { useCurrentScreenSize } from "@/hooks/useBreakpoint";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screenSize = useCurrentScreenSize();

  return (
    // <div className="relative h-[100svh] md:h-screen w-screen max-w-[99rem] bg-[#0F0F0F] text-white overflow-y-scroll flex flex-col ">
    <div className="relative size-full max-w-[99rem] bg-[#0F0F0F] text-white overflow-y-scroll flex flex-col">
      <span className="absolute top-2 right-2 text-red-600">{screenSize}</span>

      <MainNavigation />
      <div className="grow px-6 lg:px-16">{children}</div>
    </div>
  );
}
