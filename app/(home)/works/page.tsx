"use client";

import Link from "next/link";
import { motion, useAnimate, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";

import useBreakpoint from "@/hooks/useBreakpoint";
import Image from "next/image";

export default function Works() {
  const [scope, animate] = useAnimate();
  const [currentDescription, setCurrentDescription] = useState<
    "dynamicIsland" | "memoryMovie" | "components" | null
  >(null);

  const isMobile = useBreakpoint("xs");

  const previewWidth = isMobile ? 150 : 200;
  const previewHeight = isMobile ? 225 : 300;

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
          href: "",
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
              Dynamic Island is one of those designs that seems easy to come up
              with in retrospect, but in truth, is very hard to bring into
              existence.
            </p>
            <p>
              Inspired by the work of Emil Kowalski, I created this as my first
              project to test my newly acquired knowledge of creating web
              animations.
            </p>
            <p>
              Through this project, I learned to notice the smallest details of
              animation and how even a slight change can affect the overall feel
              of the design.
            </p>
          </div>
        );
      }
      case "memoryMovie": {
        return (
          <div key="memoryMovieDescription" className="space-y-4">
            <p>
              I still remember the first time I saw Apple&apos;s Memory Movie on
              my phone <br className="hidden lg:block" />
              —it was magical.
            </p>
            <p>
              Enthralled, I decided to recreate the Memory Movie myself, but
              this time on the web, as I was in the middle of a web animation
              course I was taking.
            </p>
            <p className="pt-3 text-sm xl:text-base text-[color:hsl(0,0%,70%)]">
              <span className="inline-block size-4 relative mr-2">
                <TriangleAlert
                  size={isMobile ? 16 : 18}
                  color="#FADA7A"
                  className="absolute -bottom-[3px]"
                />
              </span>
              This was primarily designed for Google Chrome, but also optimized
              for Firefox and Safari. If you&apos;re viewing this on a mobile
              browser, please note that some design elements and animations may
              not function as intended. I&apos;ll fix these issues soon.
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
  }, [currentDescription, isMobile]);

  const hideDescription = () => {
    if (currentDescription === "dynamicIsland") {
      animate(
        ".dynamicIslandPreview",
        { y: "101%" },
        { duration: 0.4, ease: "easeOut" }
      );
    }

    if (currentDescription === "memoryMovie") {
      animate(
        ".memoryMoviePreview",
        { y: "101%" },
        { duration: 0.4, ease: "easeOut" }
      );
    }

    if (currentDescription === "components") {
      animate(
        ".componentsPreview",
        { y: "101%" },
        { duration: 0.4, ease: "easeOut" }
      );
    }

    setCurrentDescription(null);
  };

  return (
    <main
      ref={scope}
      className="h-full flex flex-col lg:flex-row lg:justify-between"
    >
      <section className="flex items-center">
        <ul className="space-y-10 pb-5 pt-20 sm:pl-14 lg:pl-0 lg:mb-16 lg:py-0 lg:mr-10">
          <WorkLink
            name="Dynamic Island"
            href="/dynamic-island"
            showDescription={() => {
              setCurrentDescription("dynamicIsland");
              animate(".dynamicIslandPreview", { y: 0 }, { duration: 0.3 });
            }}
            hideDescription={() => hideDescription()}
          />
          <WorkLink
            name="Memory Movie"
            href="/memory-movie"
            showDescription={() => {
              setCurrentDescription("memoryMovie");
              animate(".memoryMoviePreview", { y: 0 }, { duration: 0.4 });
            }}
            hideDescription={() => hideDescription()}
          />
          <WorkLink
            name="Components"
            href=""
            showDescription={() => {
              setCurrentDescription("components");
              animate(".componentsPreview", { y: 0 }, { duration: 0.4 });
            }}
            hideDescription={() => hideDescription()}
          />
        </ul>
      </section>

      <section className="relative basis-1/2 grow flex flex-col-reverse justify-between lg:flex-col items-end max-w-[1000px]">
        <div className="pb-16 pt-6 sm:max-w-[40rem] mx-auto lg:py-0 lg:pl-20 lg:mx-0 xl:pl-0">
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
              className="relative text-[color:hsl(0,0%,85%)] text-base xl:text-lg font-normal"
            >
              {description}
              <motion.div
                key={currentDescription}
                animate={{ clipPath: "inset(0% 0% 0% 100%)" }}
                transition={{ duration: 1 }}
                className="text-[color:hsl(0,0%,60%)] absolute top-0"
              >
                {description}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto w-full sm:w-[38rem] lg:w-full min-h-[225px] lg:min-h-[300px] flex flex-row-reverse lg:flex-row justify-between">
          <div
            style={{ width: previewWidth, height: previewHeight }}
            className="relative overflow-hidden lg:mb-10"
          >
            <motion.div
              id="memoryMoviePreview"
              style={{ y: "101%" }}
              className="memoryMoviePreview absolute bottom-0"
            >
              <Video
                name="memory-movie"
                width={previewWidth}
                height={previewHeight}
              />
            </motion.div>
            <motion.div
              style={{ y: "101%" }}
              id="dynamicIslandPreview"
              className="dynamicIslandPreview absolute bottom-0"
            >
              <Video
                name="dynamic-island"
                width={previewWidth}
                height={previewWidth}
              />
            </motion.div>
            <motion.div
              id="componentsPreview"
              style={{ y: "101%" }}
              className="componentsPreview absolute bottom-0"
            >
              <Video name={null} width={previewWidth} height={previewWidth} />
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
                  className="lg:hidden grow flex items-center"
                >
                  <Link href={linkToOpen.href}>
                    <button className="w-full h-20">
                      <span className="font-mono text-lg sm:text-xl mr-1 underline text-[hsl(237,62%,65%)]">
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
  showDescription,
  hideDescription,
}: {
  name: string;
  href: string;
  showDescription: () => void;
  hideDescription: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isLg = useBreakpoint("lg");

  const [isShown, setIsShown] = useState(false);

  return (
    <li
      onClick={() => {
        hideDescription();
        if (isShown) {
          hideDescription();
        } else {
          showDescription();
        }
        setIsShown(!isShown);
      }}
      onMouseOver={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { duration: 0.6 }
        );
        if (isLg) showDescription();
      }}
      onMouseOut={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 0.6 }
        );
        if (isLg) hideDescription();
        setIsShown(false);
      }}
      className="relative uppercase text-5xl xl:text-6xl font-extralight"
    >
      <Link href={!isLg ? "" : href}>
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
