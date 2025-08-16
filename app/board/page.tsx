"use client";

import { BoardPageHeader, ListItem } from "@/components/boardpage";
import { Icon, LoadingScreen } from "@/components/common";
import { useBoardStore, useUiStore } from "@/stores";
import useListStore from "@/stores/listStore";
import { boardPageButtonStyles, boardPageStyles } from "@/styles/board";
import { ListData } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

function SortableList({
  id,
  isOverlay = false,
  isDraggingPlaceholder = false,
  listData,
}: {
  id: string;
  isOverlay?: boolean;
  isDraggingPlaceholder?: boolean;
  listData?: ListData;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    zIndex: isOverlay ? 9999 : "auto",
    opacity: isDraggingPlaceholder ? 0.4 : 1,
    pointerEvents: isDraggingPlaceholder
      ? ("none" as React.CSSProperties["pointerEvents"])
      : ("auto" as React.CSSProperties["pointerEvents"]),
  };

  return (
    <div
      className={"rounded-xl bg-slate-900/80"}
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className={
          "flex h-8 w-full cursor-e-resize items-center justify-center rounded-t-xl"
        }
      >
        <div className={"h-[3px] w-16 rounded-full bg-slate-800/60"} />
      </div>
      <ListItem listData={listData} />
    </div>
  );
}

export default function BoardPage() {
  //States
  const isBoardEmpty = useUiStore((state) => state.ui.isBoardEmpty);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAddingNewList, setIsAddingNewList] = useState<boolean>(
    isBoardEmpty ? isBoardEmpty : false,
  );
  const [newListName, setNewListName] = useState<string>("");
  const { board } = useBoardStore();
  const { setUi, ui } = useUiStore();
  const { lists, createList, loading } = useListStore();

  //Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 8,
      },
    }),
  );

  //Hooks
  useEffect(() => {
    if (isAddingNewList) {
      inputRef.current?.focus();
    }
  }, [isAddingNewList]);

  useEffect(() => {
    setUi({ isLoading: loading });
  }, [loading]);

  // useEffect(() => {
  //   let unsubscribeBoards: (() => void) | undefined;
  //
  //   const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (!firebaseUser) {
  //       setUi({ isLoggedIn: false });
  //       if (pathname !== "/login") router.replace("/login");
  //     } else {
  //       await fetchAndStoreUserData(firebaseUser.uid);
  //       unsubscribeBoards = fetchBoardsRealtime();
  //     }
  //   });
  //
  //   return () => {
  //     unsubscribeAuth();
  //     if (unsubscribeBoards) unsubscribeBoards();
  //   };
  // }, [pathname, router, setUi]);

  //Helpers
  const handleAddingNewList = async () => {
    if (board?.id) await createList(newListName, board?.id);
    setIsAddingNewList(false);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over?.id && over) {
      // const oldIndex = lists.findIndex((item) => item.id === active.id);
      // const newIndex = lists.findIndex((item) => item.id === over.id);
      // setLists((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  if (ui.isLoading) return <LoadingScreen />;

  return (
    <div
      className={boardPageStyles({ color: ui.colorTheme })}
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      <BoardPageHeader name={"Board"} />
      <div
        className={
          "flex w-full grow flex-row gap-5 overflow-x-auto scroll-auto p-5"
        }
      >
        {!isBoardEmpty && (
          <div className={"flex h-fit flex-row gap-5"}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={(event) => setActiveId(String(event.active.id))}
            >
              {lists && lists.length > 0 && (
                <SortableContext
                  items={lists.map((item) => item.id!).filter(Boolean)}
                  strategy={horizontalListSortingStrategy}
                >
                  {lists
                    .filter((list) => list.id && list.name)
                    .map((list) => (
                      <SortableList
                        key={list.id!}
                        id={list.id!}
                        name={list.name!}
                        listData={list}
                        isDraggingPlaceholder={activeId === list.id}
                      />
                    ))}
                </SortableContext>
              )}

              <DragOverlay>
                {activeId ? (
                  <SortableList
                    id={activeId}
                    name={
                      lists.find((list) => list.id === activeId)?.name || ""
                    }
                    isOverlay={true}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        )}

        {!isAddingNewList ? (
          <div
            onClick={() => {
              setIsAddingNewList(true);
              setNewListName("");
            }}
            className={boardPageButtonStyles({ color: ui.colorTheme })}
          >
            <Icon icon={PlusIcon} size={"lg"} containerSize={"sm"} />
            <span className={"text-xl"}>Add another list</span>
          </div>
        ) : (
          <div
            className={
              "flex max-h-fit w-96 min-w-96 flex-col rounded-xl bg-slate-900 p-4"
            }
          >
            <input
              className={
                "rounded-lg border-2 border-sky-200 bg-slate-800 p-2 text-lg"
              }
              ref={inputRef}
              placeholder={"Enter list name..."}
              type="text"
              onChange={(e) => setNewListName(e.target.value)}
            />
            <div className={"mt-5 flex flex-row items-center gap-1"}>
              <button
                disabled={newListName === ""}
                onClick={handleAddingNewList}
                className={
                  "cursor-pointer rounded-md bg-sky-600 p-3 hover:bg-sky-500 disabled:bg-slate-600"
                }
              >
                Add list
              </button>
              <Icon
                icon={XMarkIcon}
                action={() => {
                  setIsAddingNewList(false);
                }}
                rounded={"full"}
                containerHoverColor={"slate"}
                cursor={"pointer"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
