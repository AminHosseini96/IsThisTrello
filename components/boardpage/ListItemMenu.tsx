import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";

interface Props {}

const menuItemStyle = tv({
  base: "flex h-12 flex-row items-center hover:bg-gray-600 pl-2 pr-2 rounded-lg",
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

const iconStyles = tv({
  base: "h-6 w-6",
  variants: {
    color: {
      white: "text-white",
      gray: "text-gray-400",
    },
  },
  defaultVariants: {
    color: "white",
  },
});

const ListItemMenu = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-12 left-0 z-50 flex w-96 flex-col gap-2 rounded-xl border border-gray-400 bg-gray-700 p-4"
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
