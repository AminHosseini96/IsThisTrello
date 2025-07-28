import {
  ViewColumnsIcon,
  TableCellsIcon,
  HomeIcon,
  UsersIcon,
  Cog8ToothIcon,
  PlusIcon,
  ChevronDownIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";
import { Divider } from "@mui/material";
import React from "react";

const iconStyles = tv({
  base: "h-6 w-6 m-2",
  variants: {
    color: {
      white: "text-white",
      black: "text-black",
    },
  },
  defaultVariants: {
    color: "white",
  },
});

const itemStyle = tv({
  base: "flex h-12 w-full flex-row items-center rounded-xl hover:bg-gray-500 active:bg-blue-400 cursor-pointer",
});

const itemTextStyle = tv({
  base: "text-xl font-light text-white",
});

export default function SideBar() {
  return (
    <div className={"flex h-full w-1/2 flex-col gap-2 justify-self-end p-1"}>
      <div className={itemStyle()}>
        <ViewColumnsIcon className={iconStyles()} />
        <span className={itemTextStyle()}>Boards</span>
      </div>
      <div className={itemStyle()}>
        <TableCellsIcon className={iconStyles()} />
        <span className={itemTextStyle()}>Templates</span>
      </div>
      <div className={itemStyle()}>
        <HomeIcon className={iconStyles()} />
        <span className={itemTextStyle()}>Home</span>
      </div>

      <Divider className={"bg-gray-400"} />
      <span className={"mt-2 mb-2"}>Workspaces</span>

      <div className={itemStyle()}>
        <div className={"flex h-full w-full flex-row items-center p-1"}>
          <div
            className={
              "mr-3 flex aspect-square h-4/5 items-center justify-center rounded-lg bg-gradient-to-b from-pink-400 to-pink-600"
            }
          >
            <span className={"text-xl font-bold text-gray-900"}>T</span>
          </div>
          <span className={itemTextStyle()}>IsThisTrello Workspace</span>
        </div>
        <ChevronDownIcon className={iconStyles()} />
      </div>
      <div className={"flex w-4/5 flex-col gap-2 self-end"}>
        <div className={itemStyle()}>
          <ViewColumnsIcon className={iconStyles()} />
          <span className={itemTextStyle()}>Boards</span>
        </div>
        <div className={itemStyle()}>
          <UsersIcon className={iconStyles()} />
          <span className={itemTextStyle()}>Members</span>
          <div className={"ml-auto flex h-full items-center self-end"}>
            <PlusIcon className={iconStyles()} />
          </div>
        </div>
        <div className={itemStyle()}>
          <Cog8ToothIcon className={iconStyles()} />
          <span className={itemTextStyle()}>Settings</span>
        </div>
      </div>

      {/* Card at the bottom - Styles */}
      <div
        className={
          "relative mt-5 flex w-full flex-col gap-2 overflow-hidden bg-gray-700 p-5"
        }
      >
        <span className={"font-bold"}>Try IsThisTrello Premium</span>
        <span>
          Get Planner (full access), Atlassian Intelligence, card mirroring,
          list colors, and more.
        </span>
        <a href={""} className={"underline hover:text-cyan-200"}>
          Start free trial
        </a>
        <div
          className={"z-20 flex h-10 w-10 self-end rounded-xl bg-purple-400"}
        >
          <CakeIcon className={iconStyles({ color: "black" })} />
        </div>
        <div
          className={
            "absolute right-[-30px] bottom-[-40px] z-0 h-24 w-24 rotate-45 rounded-2xl bg-gray-600"
          }
        />
      </div>
    </div>
  );
}
