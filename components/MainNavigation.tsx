"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimate } from "motion/react";

export const MainNavigation = () => {
  return (
    <nav className="z-[20000] relative py-7 px-4 lg:px-16">
      <ul className="flex gap-x-5 sm:gap-x-6 text-[1.3rem] sm:font-light sm:text-2xl uppercase oxanium">
        <NavigationLink name="About" href="/about" />
        <NavigationLink name="Works" href="/works" />
        <button
          className="ml-auto uppercase "
          onClick={() => alert("Contacting..!")}
        >
          <NavigationLink name="Contact" href="" />
        </button>
      </ul>
    </nav>
  );
};

const NavigationLink = ({ name, href }: { name: string; href: string }) => {
  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      onPointerOver={() =>
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { duration: 0.6 }
        )
      }
      onPointerOut={() =>
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 0.3 }
        )
      }
      className="relative"
    >
      <Link href={href}>
        <div className="size-full">{name}</div>
        <div
          ref={scope}
          className="absolute top-0 size-full text-[hsl(0,0%,70%)]"
        >
          {name}
        </div>
      </Link>
      {isActive && <Underline />}
    </li>
  );
};

const Underline = () => (
  <motion.div
    layoutId="link-underline"
    animate={{
      backgroundPosition: ["10% 50%", "50% 20%", "80% 70%", "90% 10%"],
    }}
    transition={{
      backgroundPosition: {
        ease: "linear",
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    style={{
      background:
        "radial-gradient(circle at 50% 50%, #ffffff, #c5cff1, #909ede, #606cc7, #4247a0, #313470, #1e1f45, #08081c)",
      backgroundSize: "900% 900%",
    }}
    className="h-[2px] w-full -mt-[3px]"
  />
);