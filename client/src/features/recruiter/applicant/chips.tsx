import {
  BatteryFull,
  CakeSlice,
  Check,
  Circle,
  CircleDashed,
  ClockArrowDown,
  Handshake,
  X,
} from "lucide-react";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleDashed,
  },
  {
    value: "shortlisted",
    label: "Shortlisted",
    icon: Check,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: X,
  },
];
