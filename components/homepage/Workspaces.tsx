import BoardItem from "@/components/homepage/BoardItem";
import {
  CakeIcon,
  ClockIcon,
  Cog8ToothIcon,
  UsersIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

const iconStyles = tv({
  base: "h-6 w-6",
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

const tagStyle = tv({
  base: " flex flex-row items-center gap-2 rounded-lg pr-2 pl-2 h-full bg-opacity-{50} cursor-pointer ",
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
            <ViewColumnsIcon className={iconStyles({ color: "white" })} />
            <span className={"text-lg text-white"}>Boards</span>
          </div>
          <div className={tagStyle()}>
            <UsersIcon className={iconStyles({ color: "white" })} />
            <span className={"text-lg text-white"}>Members</span>
          </div>
          <div className={tagStyle()}>
            <Cog8ToothIcon className={iconStyles({ color: "white" })} />
            <span className={"text-lg text-white"}>Settings</span>
          </div>
          <div className={tagStyle({ color: "purple" })}>
            <div className={"flex rounded-md bg-purple-400"}>
              <CakeIcon className={iconStyles({ color: "black" })} />
            </div>
            <span className={"text-lg text-white"}>Upgrade</span>
          </div>
        </div>
      </div>

      <div className={"flex flex-row gap-5"}>
        <BoardItem boardName={"Workspace"} color={"yellow"} />
        <BoardItem boardName={"Workspace"} color={"purple"} />
        <BoardItem boardName={"Workspace"} color={"green"} />
        <BoardItem boardName={"Workspace"} color={"orange"} />
      </div>
      <div
        className={
          "mt-5 flex h-40 w-60 cursor-pointer flex-col items-center justify-center gap-5 rounded-xl bg-gray-700 hover:bg-gray-600"
        }
      >
        <span className={"text-lg"}>Create new board</span>
        <span className={"text-md"}>6 remaining</span>
      </div>
    </div>
  );
}
