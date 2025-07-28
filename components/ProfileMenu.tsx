import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";

interface Props {
  name?: string;
}

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

const ProfileMenu = forwardRef<HTMLDivElement, Props>(
  ({ name }: Props, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-16 right-0 z-50 flex w-96 flex-col gap-2 rounded-xl border border-gray-400 bg-gray-700 p-4"
      >
        <span className={"mt-2 mb-2 text-sm font-bold"}>ACCOUNT</span>
        <div className={"flex flex-row items-center"}>
          <div
            className={
              "relative mr-2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-orange-200"
            }
          >
            <span className={"text-4xl text-gray-700"}>A</span>
          </div>
          <div className={"flex flex-col gap-2"}>
            <span>Amin Karandish</span>
            <span>karandsh.mamin@gmail.com</span>
          </div>
        </div>
        <div className={menuItemStyle()}>
          <span>Switch accounts</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Manage account</span>
          <ArrowTopRightOnSquareIcon className={iconStyles()} />
        </div>
        <Divider className={"bg-gray-400"} />
        <span className={"mt-2 mb-2 text-sm font-bold"}>IsThisTrello</span>
        <div className={menuItemStyle()}>
          <span>Profile and bisibility</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Activity</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Cards</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Settings</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Theme</span>
          <ChevronRightIcon className={iconStyles()} />
        </div>
        <Divider className={"bg-gray-400"} />
        <div className={menuItemStyle({ justify: "none" })}>
          <UsersIcon className={iconStyles()} />
          <span>Create Workspace</span>
        </div>
        <Divider className={"bg-gray-400"} />
        <div className={menuItemStyle()}>
          <span>Help</span>
        </div>
        <div className={menuItemStyle()}>
          <span>Shortcuts</span>
        </div>
        <Divider className={"bg-gray-400"} />
        <div className={menuItemStyle()}>
          <span>Log out</span>
        </div>
      </div>
    );
  },
);

ProfileMenu.displayName = "ProfileMenu";
export default ProfileMenu;
