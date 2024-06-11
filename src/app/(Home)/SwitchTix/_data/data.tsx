import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const EventTypes = [
  {
    value: ["ABC","CBA"],
    label: "JP",
  },
  {
    value: ["DFG","FGD"],
    label: "KR",
  }
]

export const TixTypes = [
  {
    value: "normal",
    label: "Normal",
    icon: CircleIcon,
  },
  {
    value: "vip",
    label: "VIP",
    icon: CircleIcon,
  },
  {
    value: "fc",
    label: "FanClub",
    icon: CircleIcon,
  }
]

export const TixGroups = [
  {
    value: "standard",
    label: "Standard",
    icon: ArrowUpIcon,
  },
  {
    value: "seat",
    label: "Seat",
    icon: ArrowDownIcon,
  },
]
