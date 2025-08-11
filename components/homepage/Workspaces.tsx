import { Icon } from "@/components/common";
import { BoardItem, NewBoardModal } from "@/components/homepage";
import { useClickOutside } from "@/hooks/";
import { useBoardStore } from "@/stores";
import { BoardData } from "@/types";
import {
  CakeIcon,
  Cog8ToothIcon,
  UsersIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";
import React, { useRef, useState } from "react";

const tagStyle = tv({
  base: " flex flex-row items-center px-1 pr-2 gap-1 rounded-lg h-full bg-opacity-{50} cursor-pointer ",
  variants: {
    color: {
      purple: "bg-purple-950 hover:bg-purple-900",
      gray: "bg-gray-700 hover:bg-gray-600",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

export default function Workspaces() {
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const { boards } = useBoardStore();

  const newBoardModalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: newBoardModalRef as React.RefObject<HTMLElement>,
    handler: () => {
      setShowNewBoardModal(false);
    },
    when: showNewBoardModal,
  });

  return (
    <div className={"flex flex-col"}>
      <div className={"flex w-full flex-row items-center justify-between"}>
        <div className={"mb-2 flex h-16 w-full flex-row items-center p-1"}>
          <div
            className={
              "mr-3 flex aspect-square h-4/5 items-center justify-center rounded-lg bg-gradient-to-b from-pink-400 to-pink-600"
            }
          >
            <span className={"text-3xl font-bold text-gray-900"}>T</span>
          </div>
          <span className={"text-xl font-light text-white"}>
            IsThisTrello Workspace
          </span>
        </div>
        <div className={"flex h-1/2 flex-row items-center gap-2"}>
          <div className={tagStyle()}>
            <Icon icon={ViewColumnsIcon} containerSize={"sm"} />
            <span className={"text-lg text-white"}>Boards</span>
          </div>
          <div className={tagStyle()}>
            <Icon icon={UsersIcon} containerSize={"sm"} />
            <span className={"text-lg text-white"}>Members</span>
          </div>
          <div className={tagStyle()}>
            <Icon icon={Cog8ToothIcon} containerSize={"sm"} />
            <span className={"text-lg text-white"}>Settings</span>
          </div>
          <div className={tagStyle({ color: "purple" })}>
            <div className={"flex rounded-md bg-purple-400"}>
              <Icon
                icon={CakeIcon}
                containerSize={"sm"}
                containerStyle={"p-0"}
              />
            </div>
            <span className={"text-lg text-white"}>Upgrade</span>
          </div>
        </div>
      </div>

      <div className={"flex flex-wrap gap-5"}>
        {boards &&
          boards.map((board: BoardData, index) => {
            return (
              <BoardItem name={board.name} color={board.color} key={index} />
            );
          })}
        <div
          onClick={() => setShowNewBoardModal(true)}
          className={
            "flex h-36 w-60 cursor-pointer flex-col items-center justify-center gap-5 rounded-xl bg-gray-700 hover:bg-gray-600"
          }
        >
          <span className={"text-lg"}>Create new board</span>
          <span className={"text-md"}>6 remaining</span>
        </div>
        {showNewBoardModal && <NewBoardModal ref={newBoardModalRef} />}
      </div>
    </div>
  );
}
