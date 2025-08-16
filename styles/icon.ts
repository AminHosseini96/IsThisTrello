import { tv } from "tailwind-variants";

export const iconStyles = tv({
  base: "h-6 w-6",
  variants: {
    color: {
      white: "text-white",
      slate: "text-slate-400",
      sky: "text-sky-950",
    },
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
  },
});

export const iconContainerStyles = tv({
  base: "flex items-center justify-center transition-colors duration-200",
  variants: {
    hoverColor: {
      slate: "hover:bg-slate-700/50",
      sky: "hover:bg-sky-700",
      none: "",
    },
    cursor: {
      pointer: "cursor-pointer",
      none: "",
    },
    size: {
      sm: "p-1",
      md: "p-3",
      lg: "p-5",
    },
    rounded: {
      full: "rounded-full",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    hoverColor: "none",
    cursor: "none",
    size: "md",
    rounded: "lg",
  },
});
