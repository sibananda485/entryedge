import {
  BatteryFull,
  CakeSlice,
  Circle,
  ClockArrowDown,
  Handshake,
} from "lucide-react";

export const statuses = [
  {
    value: true,
    label: "Active",
    icon: Circle,
  },
  {
    value: false,
    label: "Inactive",
    icon: Circle,
  },
];

export const employmentTypes = [
  {
    value: "Full-time",
    label: "Full-time",
    icon: BatteryFull,
  },
  {
    value: "Contract",
    label: "Contract",
    icon: Handshake,
  },
  {
    value: "Part-time",
    label: "Part-time",
    icon: CakeSlice,
  },
  {
    value: "Temporary",
    label: "Temporary",
    icon: ClockArrowDown,
  },
];
