"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-6xl underline">
      <Link href="/about">Go!</Link>
    </div>
  );
}
