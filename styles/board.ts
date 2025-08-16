import { tv } from "tailwind-variants";

export const boardPageHeaderStyles = tv({
  base: `flex h-16 w-full flex-row items-center px-3 bg-slate-900/60 z-20`,
});

export const boardPageStyles = tv({
  base: "flex w-full flex-col ",
  variants: {
    color: {
      violet: "bg-violet-100",
      sky: "bg-sky-100",
      emerald: "bg-emerald-100",
      lime: "bg-lime-100",
      amber: "bg-amber-100",
      orange: "bg-orange-100",
      rose: "bg-rose-100",
      pink: "bg-pink-100",
    },
  },
});

export const boardPageButtonStyles = tv({
  base: "flex h-16 w-96 min-w-96 cursor-pointer flex-row items-center gap-2 rounded-xl p-4 ",
  variants: {
    color: {
      violet: "bg-violet-900/50 hover:bg-violet-900/60",
      sky: "bg-sky-900/50 hover:bg-sky-900/60",
      emerald: "bg-emerald-900/50 hover:bg-emerald-900/60",
      lime: "bg-lime-900/50 hover:bg-lime-900/60",
      amber: "bg-amber-900/50 hover:bg-amber-900/60",
      orange: "bg-orange-900/50 hover:bg-orange-900/60",
      rose: "bg-rose-900/50 hover:bg-rose-900/60",
      pink: "bg-pink-900/50 hover:bg-pink-900/60",
    },
  },
});
