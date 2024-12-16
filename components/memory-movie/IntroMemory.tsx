import Image from "next/image";

import { GRID_CELL_SIZE } from "@/app/(projects)/memory-movie/constants";
import { useImageContext } from "@/providers/image-provider";

export function IntroMemory({ index }: { index: number }) {
  const { images } = useImageContext();

  return (
    <div
      style={{
        width: GRID_CELL_SIZE,
        height: GRID_CELL_SIZE,
      }}
      className="relative visible rounded-xl"
    >
      <Image
        src={`/memory-movie/memories/${images[index]}`}
        alt={`Memory Image: ${images[index]}`}
        fill={true}
        sizes="100px"
        className="object-cover rounded-xl"
        priority
      />
    </div>
  );
}
