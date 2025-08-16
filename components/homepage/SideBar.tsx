"use client";

import { Icon } from "@/components/common";
import {
  ViewColumnsIcon,
  TableCellsIcon,
  HomeIcon,
  UsersIcon,
  Cog8ToothIcon,
  PlusIcon,
  ChevronDownIcon,
  CakeIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";
import { Divider } from "@mui/material";
import React from "react";

const itemStyle = tv({
  base: "flex h-12 w-full flex-row items-center rounded-xl hover:bg-slate-700 active:bg-slate-600 cursor-pointer",
});

const itemTextStyle = tv({
  base: "text-xl font-light text-white",
});

export default function SideBar() {
  const [showOptions, setShowOptions] = React.useState(true);

  return (
    <div className={"flex h-full max-w-80 flex-col gap-2 justify-self-end p-1"}>
      <div className={itemStyle()}>
        <Icon icon={ViewColumnsIcon} />
        <span className={itemTextStyle()}>Boards</span>
      </div>
      <div className={itemStyle()}>
        <Icon icon={TableCellsIcon} />
        <span className={itemTextStyle()}>Templates</span>
      </div>
      <div className={itemStyle()}>
        <Icon icon={HomeIcon} />
        <span className={itemTextStyle()}>Home</span>
      </div>

      <Divider className={"bg-slate-400"} />
      <span className={"mt-2 mb-2"}>Workspaces</span>

      <div
        onClick={() => setShowOptions((prev) => !prev)}
        className={itemStyle()}
      >
        <div className={"flex h-full w-full flex-row items-center p-1"}>
          <div
            className={
              "mr-3 flex aspect-square h-4/5 items-center justify-center rounded-lg bg-gradient-to-b from-pink-400 to-pink-600"
            }
          >
            <span className={"text-xl font-bold text-slate-900"}>T</span>
          </div>
          <span className={itemTextStyle()}>IsThisTrello Workspace</span>
        </div>
        {!showOptions ? (
          <Icon icon={ChevronDownIcon} />
        ) : (
          <Icon icon={ChevronUpIcon} />
        )}
      </div>
      <div
        className={`flex w-4/5 flex-col gap-2 self-end ${showOptions ? "opacity-100" : "opacity-0"}`}
      >
        <div className={itemStyle()}>
          <Icon icon={ViewColumnsIcon} />
          <span className={itemTextStyle()}>Boards</span>
        </div>
        <div className={itemStyle()}>
          <Icon icon={UsersIcon} />
          <span className={itemTextStyle()}>Members</span>
          <div className={"ml-auto flex h-full items-center self-end"}>
            <Icon icon={PlusIcon} />
          </div>
        </div>
        <div className={itemStyle()}>
          <Icon icon={Cog8ToothIcon} />
          <span className={itemTextStyle()}>Settings</span>
        </div>
      </div>

      <div
        className={`relative mt-5 flex w-full flex-col gap-2 overflow-hidden bg-slate-700 p-5 ${showOptions ? "opacity-100" : "opacity-0"}`}
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
          className={
            "z-20 flex h-10 w-10 items-center justify-center self-end rounded-xl bg-violet-400 hover:bg-violet-500"
          }
        >
          <Icon icon={CakeIcon} size={"lg"} />
        </div>
        <div
          className={
            "absolute right-[-30px] bottom-[-40px] z-0 h-24 w-24 rotate-45 rounded-2xl bg-slate-600"
          }
        />
      </div>
    </div>
  );
}
