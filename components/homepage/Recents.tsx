import { Icon } from "@/components/common";
import { BoardItem } from "@/components/homepage";
import { useBoardStore } from "@/stores";
import { BoardData } from "@/types";
import { ClockIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";

export default function Recents() {
  const { boards } = useBoardStore();

  const sortedBoards: BoardData[] = useMemo(() => {
    if (boards && boards.length > 0) {
      return [...(boards as BoardData[])].sort((a: BoardData, b: BoardData) => {
        const aTime = a.lastUpdatedAt ? a.lastUpdatedAt.getTime() : 0;
        const bTime = b.lastUpdatedAt ? b.lastUpdatedAt.getTime() : 0;
        return bTime - aTime;
      });
    } else return [];
  }, [boards]);

  return (
    <div className={"flex flex-col"}>
      <div className={"mb-2 flex flex-row items-center"}>
        <Icon icon={ClockIcon} />
        <span className={"text-2xl font-light text-white"}>
          Recently Viewed
        </span>
      </div>
      <div className={"flex flex-wrap gap-5"}>
        {sortedBoards &&
          sortedBoards.map((board: BoardData, index) => {
            return (
              <BoardItem name={board.name} color={board.color} key={index} />
            );
          })}
      </div>
    </div>
  );
}
