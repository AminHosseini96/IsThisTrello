import React, { useEffect, useLayoutEffect, useRef } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  StarIcon,
  UsersIcon,
  CheckBadgeIcon,
  UserPlusIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

interface Props {
  name: string;
}

const iconContainerStyles = tv({
  base: "flex aspect-square p-3 cursor-pointer items-center justify-center rounded-lg hover:bg-blue-700",
});

const iconStyles = tv({
  base: "h-6 w-6",
  variants: {
    color: {
      white: "text-white",
      gray: "text-gray-400",
      blue: "text-blue-950",
    },
  },
  defaultVariants: {
    color: "white",
  },
});

export default function BoardPageHeader({
  name = "Test",
}: Props): React.ReactElement {
  const [boardName, setBoardName] = React.useState(name);
  const [changeNameState, setChangeNameState] = React.useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (spanRef.current && inputRef.current && inputDivRef.current) {
      const width = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${width + 10}px`;
      inputDivRef.current.style.width = `${width + 30}px`;
    }
  }, [boardName, changeNameState]);

  return (
    <>
      <div
        className={"flex h-20 w-full flex-row items-center bg-blue-600 px-3"}
      >
        <div>
          <div
            ref={inputDivRef}
            onClick={() => setChangeNameState(true)}
            className={"rounded-md p-3 hover:bg-blue-500"}
            style={{ width: "fit-content" }}
          >
            {!changeNameState ? (
              <span className={"px-1 text-2xl"}>{boardName}</span>
            ) : (
              <input
                value={boardName}
                ref={inputRef}
                autoFocus={true}
                className={"w-full px-1 text-2xl"}
                type="text"
                onBlur={(e) => {
                  setChangeNameState(false);
                  setBoardName(e.target.value);
                }}
                onChange={(e) => setBoardName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setChangeNameState(false);
                    inputRef.current?.blur();
                  }
                }}
              />
            )}
            <span
              ref={spanRef}
              className="invisible absolute text-2xl whitespace-pre"
            >
              {boardName || "a"}
            </span>
          </div>
        </div>
        <div className={"ml-auto flex flex-row items-center gap-1"}>
          <div
            className={
              "relative mr-2 ml-2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-orange-200"
            }
          >
            <span className={"text-4xl text-gray-700"}>A</span>
            <div
              className={
                "absolute right-[-5] bottom-[-5] rounded-full bg-blue-400"
              }
            >
              <CheckBadgeIcon className={iconStyles()} />
            </div>
          </div>
          <div className={iconContainerStyles()}>
            <RocketLaunchIcon className={iconStyles({ color: "white" })} />
          </div>
          <div className={iconContainerStyles()}>
            <MagnifyingGlassIcon className={iconStyles({ color: "white" })} />
          </div>
          <div className={iconContainerStyles()}>
            <Bars3Icon className={iconStyles({ color: "white" })} />
          </div>
          <div className={iconContainerStyles()}>
            <StarIcon className={iconStyles({ color: "white" })} />
          </div>
          <div className={iconContainerStyles()}>
            <UsersIcon className={iconStyles({ color: "white" })} />
          </div>
          <div
            className={
              "flex flex-row gap-2 rounded-md bg-gray-200 p-2 hover:bg-amber-50"
            }
          >
            <UserPlusIcon className={iconStyles({ color: "blue" })} />
            <span className={"text-xl text-blue-950"}>Share</span>
          </div>
          <div className={iconContainerStyles()}>
            <EllipsisHorizontalIcon
              className={iconStyles({ color: "white" })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
