"use client";

import Link from "next/link";
import { motion, useAnimate, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/FadeIn";
import { useMemo, useState } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import Image from "next/image";

type PreviewType = "dynamic-island" | "memory-movie" | "components";

export default function Works() {
  const [scope, animate] = useAnimate();
  const [currentDescription, setCurrentDescription] =
    useState<PreviewType | null>(null);

  const isMobile = useBreakpoint("xs");

  const previewWidth = isMobile ? 150 : 200;
  const previewHeight = isMobile ? 225 : 300;

  const linkToOpen = useMemo(() => {
    switch (currentDescription) {
      case "dynamic-island":
        return {
          title: "Open Dynamic Island",
          href: "/dynamic-island",
        };
      case "memory-movie":
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
      case "dynamic-island": {
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
      case "memory-movie": {
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
            <p>
              Rather than simply replicating Apple&apos;s Memory Movie, I
              created a short{" "}
              <motion.span
                animate={{
                  color: [
                    "hsl(0, 100%, 100%)",
                    "hsl(270, 100%, 50%)",
                    "hsl(330, 100%, 50%)",
                    "hsl(0, 100%, 100%)",
                  ],
                }}
                transition={{
                  ease: "linear",
                  duration: 3,
                  times: [0, 1, 5, 9, 1],
                  repeat: Infinity,
                }}
              >
                story
              </motion.span>{" "}
              that reflects how I imagined the design as I worked on it. The
              story also illustrates the chronological process of how I
              implement the animation design.
            </p>
            <p className="pt-1 text-sm xl:text-sm text-[color:hsl(0,0%,70%)] italic">
              If you&apos;re viewing this on a mobile browser, please note that
              some design elements and animations may not function as intended.
              This will be fixed soon.
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

  const hideDetails = () => {
    if (currentDescription === null) return;

    animate(
      `#${currentDescription}-preview`,
      { y: "101%" },
      { duration: 0.4, ease: "easeOut" }
    );

    setCurrentDescription(null);
  };

  const showDetails = (preview: PreviewType) => {
    setCurrentDescription(preview);
    animate(`#${preview}-preview`, { y: 0 }, { duration: 0.3 });
  };

  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   if (searchParams.get("v")) {
  //     showDetails(searchParams.get("v") as PreviewType);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);

  return (
    <main
      ref={scope}
      className="h-full flex flex-col lg:flex-row lg:justify-between"
    >
      <section className="flex items-center">
        <ul className="space-y-10 pb-5 pt-5 sm:pl-14 lg:pl-0 lg:mb-32 lg:py-0 lg:mr-10">
          <WorkLink
            name="Dynamic Island"
            href="/dynamic-island"
            showDetails={() => showDetails("dynamic-island")}
            hideDetails={() => hideDetails()}
          />
          <WorkLink
            name="Memory Movie"
            href="/memory-movie"
            showDetails={() => showDetails("memory-movie")}
            hideDetails={() => hideDetails()}
          />
          <WorkLink
            name="Components"
            href=""
            showDetails={() => showDetails("components")}
            hideDetails={() => hideDetails()}
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
              className="relative text-[color:hsl(0,0%,85%)] text-lg md:text-base font-normal"
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
              id="memory-movie-preview"
              style={{ y: "101%" }}
              className="absolute bottom-0"
            >
              <Video
                name="memory-movie"
                width={previewWidth}
                height={previewHeight}
              />
            </motion.div>
            <motion.div
              style={{ y: "101%" }}
              id="dynamic-island-preview"
              className="absolute bottom-0"
            >
              <Video
                name="dynamic-island"
                width={previewWidth}
                height={previewWidth}
              />
            </motion.div>
            <motion.div
              id="components-preview"
              style={{ y: "101%" }}
              className="absolute bottom-0"
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
  showDetails,
  hideDetails,
}: {
  name: string;
  href: string;
  showDetails: () => void;
  hideDetails: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isLg = useBreakpoint("lg");

  const [isShown, setIsShown] = useState(false);

  return (
    <li
      onClick={() => {
        hideDetails();
        if (!isShown) {
          showDetails();
        }
        setIsShown(!isShown);
      }}
      onMouseOver={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { duration: 0.6 }
        );
        if (isLg) showDetails();
      }}
      onMouseOut={() => {
        animate(
          scope.current,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { duration: 0.6 }
        );
        if (isLg) hideDetails();
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
