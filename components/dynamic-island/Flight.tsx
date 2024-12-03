"use client";

import { Globe, Plane } from "lucide-react";
import { motion } from "motion/react";

export function Flight({ isExpanded }: { isExpanded: boolean | undefined }) {
  return isExpanded ? <ExpandedFlight /> : <CompactTimer />;
}

function CompactTimer() {
  return (
    <div className="h-[41px] w-[255px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        className="h-full"
      >
        <div className="text-white h-full flex items-center justify-between px-[8px]">
          <Plane
            size={23}
            fill="#42aafa"
            strokeWidth={0}
            className="rotate-45"
          />
          <div className="bg-[#027DDA] font-medium rounded-3xl text-xs px-2 py-1">
            8 min
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExpandedFlight() {
  return (
    <div className="w-[407px]">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0.5 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-y-1 h-full px-[18px] pt-[16px] pb-[19px] text-white relative"
      >
        <div className="flex justify-between text-lg">
          <div className="flex items-center gap-x-0.5">
            <Globe size={18} />
            <span className="font-extrabold">Horizon</span>
          </div>
          <span className="font-medium">Landing in 8m</span>
        </div>
        <div className="flex justify-between text-4xl font-medium">
          <span>SFO</span>
          <span>IAH</span>
        </div>
        <div className="flex justify-between text-[#8ED6FF]">
          <span>Departed 11:04 AM</span>
          <span>Terminal C 4:55 PM</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[30px] w-[210px] h-fit">
          <PlaneTrack />
        </div>
      </motion.div>
    </div>
  );
}

function PlaneTrack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 305 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter
          id="solidBlurFilter"
          x="-10%"
          y="-100%"
          width="120%"
          height="400%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <filter
          id="dashedBlurFilter"
          x="-10%"
          y="-100%"
          width="100%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" />
        </filter>
        <filter
          id="planeBlurFilter"
          x="-10%"
          y="-100%"
          width="120%"
          height="400%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
        </filter>
      </defs>

      <circle
        cx="20"
        cy="60"
        r="10"
        fill="none"
        stroke="#4A90E2"
        strokeWidth="4"
        opacity="0.4"
      />

      {/* End point circles */}
      <circle cx="280" cy="60" r="5" fill="#83CEFE" />
      <circle
        cx="280"
        cy="60"
        r="10"
        fill="none"
        stroke="#83CEFE"
        strokeWidth="4"
        opacity="0.4"
      />
      <circle
        cx="280"
        cy="60"
        r="21"
        fill="none"
        stroke="#83CEFE"
        strokeWidth="3"
        opacity="0.1"
      />

      <g id="Dashed_Path">
        {/* Dashed curved path shadow */}
        <path
          d="M 180,50, Q 220,52, 280,60"
          stroke="#050505"
          fill="none"
          strokeDasharray="7,8"
          strokeLinecap="round"
          strokeWidth="0.4"
          filter="url(#dashedBlurFilter)"
          style={{
            opacity: 0.6,
          }}
        />

        {/* Dashed curved path */}
        <path
          d="m271.33333,56.32754c-0.11014,-0.68986 -52.21449,-25.03768 -120.53333,-26.52754c-68.31884,-1.48986 -131.6,30.4 -131.6,30.2"
          strokeDasharray="5,10"
          strokeWidth="3.5"
          strokeLinecap="round"
          stroke="#83CEFE"
          fill="none"
        />
      </g>

      <g id="Solid_Path">
        {/* Solid curved path shadow */}
        <path
          d="M 20,60 Q 150,40 280,60"
          stroke="#050505"
          fill="none"
          strokeWidth="0.6"
          filter="url(#solidBlurFilter)"
          style={{
            opacity: 0.6,
            strokeDasharray: "100%",
            animation: "drawLine 30s linear infinite",
          }}
        />

        {/* Solid curved path with animation */}
        <path
          d="M 20,60 Q 150,0 280,60"
          stroke="#ffffff"
          fill="none"
          strokeWidth="4"
          style={{
            strokeDasharray: "100%",
            animation: "drawLine 30s linear infinite",
          }}
        />
      </g>

      <circle cx="20" cy="60" r="5" fill="white" />

      <g id="Plane_Icon">
        {/* Airplane shadow */}
        <g
          style={{
            opacity: 0.2,
            offsetPath: "path('M 20,60 Q 150,40 280,60')",
            animation: "movePlane 30s linear infinite",
          }}
          filter="url(#planeBlurFilter)"
        >
          <path
            d="M16.63,105.75c0.01-4.03,2.3-7.97,6.03-12.38L1.09,79.73c-1.36-0.59-1.33-1.42-0.54-2.4l4.57-3.9 c0.83-0.51,1.71-0.73,2.66-0.47l26.62,4.5l22.18-24.02L4.8,18.41c-1.31-0.77-1.42-1.64-0.07-2.65l7.47-5.96l67.5,18.97L99.64,7.45 c6.69-5.79,13.19-8.38,18.18-7.15c2.75,0.68,3.72,1.5,4.57,4.08c1.65,5.06-0.91,11.86-6.96,18.86L94.11,43.18l18.97,67.5 l-5.96,7.47c-1.01,1.34-1.88,1.23-2.65-0.07L69.43,66.31L45.41,88.48l4.5,26.62c0.26,0.94,0.05,1.82-0.47,2.66l-3.9,4.57 c-0.97,0.79-1.81,0.82-2.4-0.54l-13.64-21.57c-4.43,3.74-8.37,6.03-12.42,6.03C16.71,106.24,16.63,106.11,16.63,105.75 L16.63,105.75z"
            fill="#050505"
            transform="translate(-22,-20) scale(0.23) rotate(45)"
          />
        </g>
        {/* Airplane */}
        <g
          style={{
            offsetPath: "path('M 20,60 Q 150,0 280,60')",
            animation: "movePlane 30s linear infinite",
          }}
        >
          <path
            d="M16.63,105.75c0.01-4.03,2.3-7.97,6.03-12.38L1.09,79.73c-1.36-0.59-1.33-1.42-0.54-2.4l4.57-3.9 c0.83-0.51,1.71-0.73,2.66-0.47l26.62,4.5l22.18-24.02L4.8,18.41c-1.31-0.77-1.42-1.64-0.07-2.65l7.47-5.96l67.5,18.97L99.64,7.45 c6.69-5.79,13.19-8.38,18.18-7.15c2.75,0.68,3.72,1.5,4.57,4.08c1.65,5.06-0.91,11.86-6.96,18.86L94.11,43.18l18.97,67.5 l-5.96,7.47c-1.01,1.34-1.88,1.23-2.65-0.07L69.43,66.31L45.41,88.48l4.5,26.62c0.26,0.94,0.05,1.82-0.47,2.66l-3.9,4.57 c-0.97,0.79-1.81,0.82-2.4-0.54l-13.64-21.57c-4.43,3.74-8.37,6.03-12.42,6.03C16.71,106.24,16.63,106.11,16.63,105.75 L16.63,105.75z"
            fill="#ffffff"
            transform="translate(-25,-20) scale(0.24) rotate(43)"
          />
        </g>
      </g>
    </svg>
  );
}
