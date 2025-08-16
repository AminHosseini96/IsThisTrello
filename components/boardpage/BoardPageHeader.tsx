import { Icon } from "@/components/common/";
import { AppInput } from "@/components/common/AppInput";
import Avatar from "@/components/common/Avatar";
import { NewBoardModal } from "@/components/homepage";
import { useClickOutside } from "@/hooks";
import { useBoardStore } from "@/stores";
import { boardPageHeaderStyles } from "@/styles/board";
import React, { useRef, useState } from "react";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  StarIcon,
  UsersIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface Props {
  name: string;
}

export default function BoardPageHeader({}: Props): React.ReactElement {
  //States
  const boardData = useBoardStore((state) => state.board);
  const { updateBoard } = useBoardStore();
  const boardName = boardData?.name ? boardData.name : "";
  const [changeNameState, setChangeNameState] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);

  //Refs
  const newBoardModalRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputDivRef = useRef<HTMLDivElement>(null);

  //Hooks
  useClickOutside({
    ref: newBoardModalRef as React.RefObject<HTMLElement>,
    handler: () => {
      setShowNewBoardModal(false);
    },
    when: showNewBoardModal,
  });

  //Helpers
  const handleInputBlur = async (value: string) => {
    setChangeNameState(false);
    if (boardData?.id && boardData?.name !== value) {
      await updateBoard(boardData.id, { name: value });
    }
  };

  return (
    <>
      <div className={boardPageHeaderStyles()}>
        <div>
          <div ref={inputDivRef} onClick={() => setChangeNameState(true)}>
            {!changeNameState ? (
              <span
                className={
                  "cursor-pointer rounded-md border-b-2 border-b-transparent px-2 py-1 text-xl hover:bg-slate-900/20"
                }
              >
                {boardName}
              </span>
            ) : (
              <AppInput
                value={boardName}
                autoFocus
                resizable
                textSize={"xl"}
                onBlur={handleInputBlur}
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
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
          <Icon
            icon={MagnifyingGlassIcon}
            cursor={"pointer"}
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
          <Icon
            icon={Bars3Icon}
            cursor={"pointer"}
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
          <Icon
            icon={StarIcon}
            cursor={"pointer"}
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
          <Icon
            icon={UsersIcon}
            cursor={"pointer"}
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
          <div
            className={
              "flex flex-row items-center gap-2 rounded-md bg-slate-100/70 p-2 pr-3 hover:bg-slate-100/90"
            }
          >
            <Icon icon={UserPlusIcon} color={"sky"} containerSize={"sm"} />
            <span className={"text-xl text-sky-950"}>Share</span>
          </div>
          <Icon
            icon={EllipsisHorizontalIcon}
            cursor={"pointer"}
            containerHoverColor={"slate"}
            rounded={"lg"}
          />
        </div>
        {showNewBoardModal && <NewBoardModal ref={newBoardModalRef} />}
      </div>
    </>
  );
}
