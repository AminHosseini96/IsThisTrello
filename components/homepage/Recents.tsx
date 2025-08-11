import { Icon } from "@/components/common";
import { BoardItem } from "@/components/homepage";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Recents() {
  return (
    <div className={"flex flex-col"}>
      <div className={"mb-2 flex flex-row items-center"}>
        <Icon icon={ClockIcon} />
        <span className={"text-2xl font-light text-white"}>
          Recently Viewed
        </span>
      </div>
      <div className={"flex flex-wrap gap-5"}>
        <BoardItem boardName={"Workspace"} color={"orange"} />
        <BoardItem boardName={"Workspace"} color={"red"} />
        <BoardItem boardName={"Workspace"} color={"green"} />
        <BoardItem boardName={"Workspace"} color={"blue"} />
      </div>
    </div>
  );
}
