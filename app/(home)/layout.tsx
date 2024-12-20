"use client";

import { MainNavigation } from "@/components/MainNavigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative size-full max-w-[99rem] bg-[hsl(240,3%,7%)] text-[hsl(270,6%,90%)] overflow-y-scroll flex flex-col font-light text-lg">
      <MainNavigation />
      <div className="grow px-6 lg:px-16 mt-3">{children}</div>
    </div>
  );
}
