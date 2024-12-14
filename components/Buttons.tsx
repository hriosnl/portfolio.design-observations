import { ArrowUpToLine } from "lucide-react";

export const ScrollToTopButton = () => (
  <div className="sm:hidden w-full flex justify-end pb-3">
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="text-white rounded-md"
    >
      <ArrowUpToLine size={25} strokeWidth={2} />
    </button>
  </div>
);
