import { Icon } from "@/components/common/";
import { NewBoardModal } from "@/components/homepage";
import { useClickOutside } from "@/hooks";
import { useBoardStore } from "@/stores";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  StarIcon,
  UsersIcon,
  CheckBadgeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface Props {
  name: string;
}

export default function BoardPageHeader({}: Props): React.ReactElement {
  //States
  const boardData = useBoardStore((state) => state.board);
  const [boardName, setBoardName] = React.useState(boardData?.name);
  const [changeNameState, setChangeNameState] = React.useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  //Refs
  const newBoardModalRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);
  //Hooks
  useClickOutside({
    ref: newBoardModalRef as React.RefObject<HTMLElement>,
    handler: () => {
      setShowNewBoardModal(false);
    },
    when: showNewBoardModal,
  });

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
            <Icon
              icon={CheckBadgeIcon}
              rounded={"full"}
              containerStyle={"absolute right-[-5] bottom-[-5] bg-blue-400 p-0"}
            />
          </div>
          <Icon
            icon={RocketLaunchIcon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
          <Icon
            icon={MagnifyingGlassIcon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
          <Icon
            icon={Bars3Icon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
          <Icon
            icon={StarIcon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
          <Icon
            icon={UsersIcon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
          <div
            className={
              "flex flex-row items-center gap-2 rounded-md bg-gray-200 p-2 pr-3 hover:bg-amber-50"
            }
          >
            <Icon icon={UserPlusIcon} color={"blue"} containerSize={"sm"} />
            <span className={"text-xl text-blue-950"}>Share</span>
          </div>
          <Icon
            icon={EllipsisHorizontalIcon}
            cursor={"pointer"}
            containerHoverColor={"blue"}
            rounded={"lg"}
          />
        </div>
        {showNewBoardModal && <NewBoardModal ref={newBoardModalRef} />}
      </div>
    </>
  );
}
