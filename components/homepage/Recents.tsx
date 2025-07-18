import BoardItem from "@/components/homepage/BoardItem";
import { tv } from "tailwind-variants";
import { ClockIcon } from "@heroicons/react/24/outline";

const iconStyles = tv({
  base: "h-6 w-6 m-2",
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

export default function Recents() {
  return (
    <div className={"flex flex-col"}>
      <div className={"mb-2 flex flex-row items-center"}>
        <ClockIcon className={iconStyles({ color: "white" })} />
        <span className={"text-2xl font-light text-white"}>
          Recently Viewed
        </span>
      </div>
      <div className={"flex flex-row gap-5"}>
        <BoardItem boardName={"Workspace"} color={"orange"} />
        <BoardItem boardName={"Workspace"} color={"red"} />
        <BoardItem boardName={"Workspace"} color={"green"} />
        <BoardItem boardName={"Workspace"} color={"blue"} />
      </div>
    </div>
  );
}
