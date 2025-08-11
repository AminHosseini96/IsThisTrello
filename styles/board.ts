import { tv } from "tailwind-variants";

export const boardPageHeaderStyles = tv({
  base: `flex h-20 w-full flex-row items-center px-3`,
  variants: {
    color: {
      purple: "bg-purple-900",
      blue: "bg-blue-900",
      green: "bg-green-900",
      lime: "bg-lime-900",
      yellow: "bg-yellow-900",
      orange: "bg-orange-900",
      red: "bg-red-900",
      pink: "bg-pink-900",
    },
  },
});

export const boardPageStyles = tv({
  base: "flex w-full grow flex-row gap-5 overflow-x-auto scroll-auto p-5",
  variants: {
    color: {
      purple: "bg-purple-100",
      blue: "bg-blue-100",
      green: "bg-green-100",
      lime: "bg-lime-100",
      yellow: "bg-yellow-100",
      orange: "bg-orange-100",
      red: "bg-red-100",
      pink: "bg-pink-100",
    },
  },
});

export const boardPageButtonStyles = tv({
  base: "flex h-16 w-96 min-w-96 cursor-pointer flex-row items-center gap-2 rounded-xl p-4 ",
  variants: {
    color: {
      purple: "bg-purple-900 hover:bg-purple-800",
      blue: "bg-blue-900 hover:bg-blue-800",
      green: "bg-green-900 hover:bg-green-800",
      lime: "bg-lime-900 hover:bg-lime-800",
      yellow: "bg-yellow-900 hover:bg-yellow-800",
      orange: "bg-orange-900 hover:bg-orange-800",
      red: "bg-red-900 hover:bg-red-800",
      pink: "bg-pink-900 hover:bg-pink-800",
    },
  },
});
