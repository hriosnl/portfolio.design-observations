"use client";

import Link from "next/link";
import { motion, useAnimate, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { useMemo, useState } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import Image from "next/image";

export default function Works() {
  const [scope, animate] = useAnimate();
  const [currentDescription, setCurrentDescription] = useState<
    "dynamicIsland" | "memoryMovie" | "components" | null
  >(null);

  const isMobile = useBreakpoint("xs");

  const width = isMobile ? 150 : 200;
  const height = isMobile ? 225 : 300;
  const linkToOpen = useMemo(() => {
    switch (currentDescription) {
      case "dynamicIsland":
        return {
          title: "Open Dynamic Island",
          href: "/dynamic-island",
        };
      case "memoryMovie":
        return {
          title: "Open Memory Movie",
          href: "/memory-movie",
        };
      case "components":
        return {
          title: "In Progress...",
          href: "/components",
        };

      default:
        return {
          title: "",
          href: "",
        };
    }
  }, [currentDescription]);

  const description = useMemo(() => {
    switch (currentDescription) {
      case "dynamicIsland": {
        return (
          <div key="dynamicIslandDescription" className="space-y-4">
            <p>
              Dynamic Island on the Web brings Apple&apos;s Dynamic Island
              experience to websites, creating an interactive, visually engaging
              overlay for notifications, controls, and real-time updates. It
              enhances user engagement by delivering fluid animations and
              context-aware interactions, seamlessly integrating with web
              applications for a modern, responsive, and immersive user
              experience.
            </p>
            <p>
              However, achieving a consistent experience across devices and
              browsers requires careful implementation, as variations in
              performance, compatibility, and accessibility standards can impact
              the intended functionality and user interaction.
            </p>
          </div>
        );
      }
      case "memoryMovie": {
        return (
          <div key="memoryMovieDescription" className="space-y-4">
            <p>
              Memory Movie transforms your digital knowledge into an
              interactive, cinematic timeline. It visualizes saved information,
              connecting moments and ideas through a narrative-like experience.
              Designed for clarity and reflection, it enables users to revisit,
              organize, and relive their digital memories intuitively, making
              information recall both engaging and impactful.
            </p>
            <p>
              That said, creating a seamless and meaningful experience requires
              robust data structuring and intuitive design, as poorly organized
              information or overly complex interfaces can detract from the
              user’s ability to engage with their memories effectively.
            </p>
          </div>
        );
      }
      case "components": {
        return "";
      }
      case null: {
        return "";
      }
    }
  }, [currentDescription]);

  return (
    <main
      ref={scope}
      className="h-full flex flex-col md:flex-row md:justify-between"
    >
      <section className="flex items-center ">
        <ul className="space-y-10 pb-5 pt-20 px-0 md:mb-16 md:py-0 md:mr-10">
          <WorkLink
            name="Dynamic Island"
            href="/dynamic-island"
            handleMouseOver={() => {
              setCurrentDescription("dynamicIsland");
              animate(".dynamicIslandPreview", { y: 0 }, { duration: 0.3 });
            }}
            handleMouseOut={() => {
              setCurrentDescription(null);
              animate(
                ".dynamicIslandPreview",
                { y: "101%" },
                { duration: 0.45, ease: "easeOut" }
              );
            }}
          />
          <WorkLink
            name="Memory Movie"
            href="/memory-movie"
            handleMouseOver={() => {
              setCurrentDescription("memoryMovie");
              animate(".memoryMoviePreview", { y: 0 }, { duration: 0.4 });
            }}
            handleMouseOut={() => {
              setCurrentDescription(null);
              animate(".memoryMoviePreview", { y: "101%" }, { duration: 0.4 });
            }}
          />
          <WorkLink
            name="Components"
            href="/components"
            handleMouseOver={() => {
              setCurrentDescription("components");
              animate(".componentsPreview", { y: 0 }, { duration: 0.4 });
            }}
            handleMouseOut={() => {
              setCurrentDescription(null);
              animate(".componentsPreview", { y: "101%" }, { duration: 0.4 });
            }}
          />
        </ul>
      </section>

      <section className="relative basis-1/2 grow flex flex-col-reverse justify-between md:flex-col items-end max-w-[1000px]">
        <div className="pb-16 pt-6 md:pb-0 md:pl-28 xl:pl-32 max-w-[900px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.4 }}
              className="relative text-[color:hsl(0,0%,85%)] text-lg font-normal"
            >
              {description}
              <motion.div
                key={currentDescription}
                animate={{ clipPath: "inset(0% 0% 0% 100%)" }}
                transition={{ duration: 0.7 }}
                className="text-[color:hsl(0,0%,60%)] absolute top-0"
              >
                {description}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full  min-h-[225px] md:min-h-[300px] flex flex-row-reverse md:flex-row justify-between">
          <div
            style={{ width, height }}
            className="relative overflow-hidden lg:mb-10"
          >
            <motion.div
              id="memoryMoviePreview"
              style={{ y: "101%" }}
              className="memoryMoviePreview absolute bottom-0"
            >
              <Video name="memory-movie" width={width} height={height} />
            </motion.div>
            <motion.div
              style={{ y: "101%" }}
              id="dynamicIslandPreview"
              className="dynamicIslandPreview absolute bottom-0"
            >
              <Video name="dynamic-island" width={width} height={width} />
            </motion.div>
            <motion.div
              id="componentsPreview"
              style={{ y: "101%" }}
              className="componentsPreview absolute bottom-0"
            >
              <Video name={null} width={width} height={width} />
            </motion.div>
          </div>

          {currentDescription !== null &&
            currentDescription !== "components" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDescription}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden grow flex items-center"
                >
                  <Link href={linkToOpen.href}>
                    <button className="w-full h-20">
                      <span className="font-mono text-lg mr-1 link">
                        {linkToOpen.title}
                      </span>
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}
        </div>
      </section>

      <FadeIn />
    </main>
  );
}

const WorkLink = ({
  name,
  href,
  handleMouseOver,
  handleMouseOut,
}: {
  name: string;
  href: string;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isMobile = useBreakpoint("xs");

  return (
    <li
      onMouseOver={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { duration: 0.6 }
        );
        handleMouseOver();
      }}
      onMouseOut={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 0.6 }
        );
        handleMouseOut();
      }}
      className="relative uppercase text-5xl lg:text-6xl font-extralight"
    >
      <Link href={isMobile ? "" : href}>
        <div className="size-full text-[hsl(0,0%,100%)]">{name}</div>
        <div
          ref={scope}
          className="absolute top-0 size-full text-[hsl(0,0%,65%)]"
        >
          {name}
        </div>
      </Link>
    </li>
  );
};

const Video = ({
  name,
  width,
  height,
}: {
  name: string | null;
  width: number;
  height: number;
}) => {
  return name === null ? (
    <p
      style={{
        height,
        width,
      }}
      className="flex justify-center items-center bg-white text-black text-2xl italic"
    >
      Coming Soon
    </p>
  ) : (
    <video
      width={width}
      height={height}
      preload="none"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={`/home/${name}.mp4`} type="video/mp4" />
      <div>
        <Image
          src={`/home/${name}.jpeg`}
          width={width}
          height={height}
          alt={name}
        />
      </div>
    </video>
  );
};
