import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = object;

const menuItemStyle = tv({
  base: "flex h-12 flex-row items-center hover:bg-slate-600 pl-2 pr-2 rounded-lg",
  variants: {
    justify: {
      between: "justify-between",
      none: "gap-2",
    },
  },
  defaultVariants: {
    justify: "between",
  },
});

const ListItemMenu = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-10 left-[90%] z-50 flex w-96 flex-col gap-2 rounded-xl border border-slate-400 bg-slate-700 p-4"
    >
      <span className={"self-center"}>List Actions</span>
      <div className={menuItemStyle()}>
        <span>Add card</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Copy list</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Move list</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Move all cards in this list</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Sort by...</span>
      </div>
    </div>
  );
});

ListItemMenu.displayName = "ListItemMenu";
export default ListItemMenu;
