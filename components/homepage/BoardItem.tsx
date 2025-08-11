"use client";

import { Icon } from "@/components/common";
import { useBoardStore, useUiStore } from "@/stores";
import { BoardData, UiData } from "@/types";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFill } from "@heroicons/react/24/solid";
import React from "react";
import { useRouter } from "next/navigation";

export default function BoardItem(boardData: BoardData) {
  const [isLiked, setIsLiked] = React.useState(false);
  const { setBoard } = useBoardStore();
  const { setUi } = useUiStore();

  const router = useRouter();

  const handleClick = () => {
    const color: UiData["colorTheme"] = boardData.color.slice(
      3,
      -4,
    ) as UiData["colorTheme"];
    setUi({
      colorTheme: color as UiData["colorTheme"],
    });
    setBoard(boardData);
    router.push("/board");
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex h-36 w-60 cursor-pointer flex-col overflow-hidden"
    >
      <div
        onClick={() => {
          setIsLiked((prev) => !prev);
        }}
        className={
          "absolute top-3 right-[-40px] z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-600 opacity-0" +
          " translate-x-[-20px] transform" +
          " transition-all duration-400 ease-in-out" +
          " group-hover:right-3 group-hover:translate-x-0 group-hover:opacity-100"
        }
      >
        {!isLiked ? (
          <Icon icon={StarIcon} containerSize={"sm"} />
        ) : (
          <Icon
            icon={StarIconFill}
            iconStyle={"text-yellow-400"}
            containerSize={"sm"}
          />
        )}
      </div>
      <div
        className={
          "absolute z-0 hidden h-36 w-60 rounded-xl bg-gray-600 opacity-40 group-hover:block"
        }
      />
      <div
        className={`${boardData.color} flex h-28 w-full justify-end rounded-t-xl`}
      />
      <div
        className={
          "z-10 flex h-12 w-full items-center rounded-b-xl bg-gray-900 p-2"
        }
      >
        <span>{boardData.name}</span>
      </div>
    </div>
  );
}
