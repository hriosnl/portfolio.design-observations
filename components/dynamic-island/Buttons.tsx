import {
  Timer as TimerIcon,
  CarFront as Car,
  PlaneTakeoff as Plane,
  Icon,
} from "lucide-react";
import { mug } from "@lucide/lab";

import { ViewName } from "@/app/dynamic-island/types";

export const ActionButtons = [
  {
    name: ViewName.TIMER,
    icon: <TimerIcon size={28} strokeWidth={1.3} />,
    color: "#FDB000",
  },
  {
    name: ViewName.COFFEE,
    icon: <Icon iconNode={mug} size={28} strokeWidth={1.3} />,
    color: "#FD7200",
  },
  {
    name: ViewName.RIDE,
    icon: <Car size={28} strokeWidth={1.3} />,
    color: "#5B3C07",
  },
  {
    name: ViewName.FLIGHT,
    icon: <Plane size={28} strokeWidth={1.3} />,
    color: "#5B3C07",
  },
];
