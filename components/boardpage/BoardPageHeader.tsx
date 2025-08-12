import { Icon } from "@/components/common/";
import Avatar from "@/components/common/Avatar";
import { NewBoardModal } from "@/components/homepage";
import { useClickOutside } from "@/hooks";
import { useBoardStore, useUiStore } from "@/stores";
import { boardPageHeaderStyles } from "@/styles/board";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
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
  const { updateBoard } = useBoardStore();
  const [boardName, setBoardName] = useState(boardData?.name);
  const [changeNameState, setChangeNameState] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const colorTheme = useUiStore((state) => state.ui.colorTheme);

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
      inputDivRef.current.style.width = `${width + 10}px`;
    }
  }, [boardName, changeNameState]);

  //Helpers
  const handleInputBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeNameState(false);
    setBoardName(e.target.value);
    if (boardData?.id && boardData?.name !== e.target.value) {
      await updateBoard(boardData?.id, { name: e.target.value });
    }
  };

  return (
    <>
      <div className={boardPageHeaderStyles({ color: colorTheme })}>
        <div>
          <div
            ref={inputDivRef}
            onClick={() => setChangeNameState(true)}
            className={
              "cursor-pointer rounded-md border-2 border-transparent hover:border-white"
            }
          >
            {!changeNameState ? (
              <span className={"px-1 text-2xl"}>{boardName}</span>
            ) : (
              <input
                value={boardName}
                ref={inputRef}
                autoFocus={true}
                className={"w-full rounded-md px-1 text-2xl"}
                type="text"
                onBlur={handleInputBlur}
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
          <Avatar isMenuEnabled={false} isOwner={true} />
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
