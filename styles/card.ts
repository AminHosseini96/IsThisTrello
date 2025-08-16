import { tv } from "tailwind-variants";

export const cardStyles = tv({
  base: `relative flex h-fit w-full flex-col rounded-xl border-transparent p-3 transition-all duration-100`,
  variants: {
    isMenuOpen: {
      open: "z-30 min-h-32",
      closed: "z-0 min-h-16 border-2 group-hover:border-white",
    },
    color: {
      violet: "bg-violet-100/30",
      sky: "bg-sky-100/30",
      emerald: "bg-emerald-100/30",
      lime: "bg-lime-100/30",
      amber: "bg-amber-100/30",
      orange: "bg-orange-100/30",
      rose: "bg-rose-100/30",
      pink: "bg-pink-100/30",
    },
  },
});
