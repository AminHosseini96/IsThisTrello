"use client";

import { BoardPageHeader, ListItem } from "@/components/boardpage";
import { Icon } from "@/components/common";
import { useUiStore } from "@/stores";
import { boardPageButtonStyles, boardPageStyles } from "@/styles/board";
import React, { useEffect } from "react";
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
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

type ListType = { id: string; name: string };

function SortableList({
  id,
  name,
  isOverlay = false,
  isDraggingPlaceholder = false,
}: {
  id: string;
  name: string;
  isOverlay?: boolean;
  isDraggingPlaceholder?: boolean;
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
    <div className={"rounded-xl bg-gray-900"} ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        className={
          "flex h-8 w-full cursor-e-resize items-center justify-center rounded-t-xl bg-gray-900"
        }
      >
        <div className={"h-[3px] w-16 rounded-full bg-gray-800"} />
      </div>
      <ListItem name={name} />
    </div>
  );
}

export default function BoardPage() {
  const [lists, setLists] = React.useState<ListType[]>([
    { id: "1", name: "Games" },
    { id: "2", name: "Hobbies" },
    { id: "3", name: "Work" },
  ]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isAddingNewList, setIsAddingNewList] = React.useState<boolean>(false);
  const [newListName, setNewListName] = React.useState<string>("");
  const setUi = useUiStore((state) => state.setUi);
  const colorTheme = useUiStore((state) => state.ui.colorTheme);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    if (isAddingNewList) {
      inputRef.current?.focus();
    }
  }, [isAddingNewList]);

  useEffect(() => {
    setUi({ isLoading: false, isLoggedIn: true, isSignedUp: true });
  }, [setUi]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over?.id && over) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over.id);
      setLists((items) => arrayMove(items, oldIndex, newIndex));
    }
  }
  return (
    <div
      className={"flex w-full flex-col"}
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      <BoardPageHeader name={"Board"} />
      <div className={boardPageStyles({ color: colorTheme })}>
        <div className={"flex h-fit flex-row gap-5"}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveId(String(event.active.id))}
          >
            <SortableContext
              items={lists.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => (
                <SortableList
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  isDraggingPlaceholder={activeId === list.id}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <SortableList
                  id={activeId}
                  name={lists.find((list) => list.id === activeId)?.name || ""}
                  isOverlay={true}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {!isAddingNewList ? (
          <div
            onClick={() => {
              setIsAddingNewList(true);
              setNewListName("");
            }}
            className={boardPageButtonStyles({ color: colorTheme })}
          >
            <Icon icon={PlusIcon} size={"lg"} containerSize={"sm"} />
            <span className={"text-xl"}>Add another list</span>
          </div>
        ) : (
          <div
            className={
              "flex max-h-fit w-96 min-w-96 flex-col rounded-xl bg-gray-900 p-4"
            }
          >
            <input
              className={
                "rounded-lg border-2 border-blue-200 bg-gray-800 p-2 text-lg"
              }
              ref={inputRef}
              placeholder={"Enter list name..."}
              type="text"
              onChange={(e) => setNewListName(e.target.value)}
            />
            <div className={"mt-5 flex flex-row items-center gap-1"}>
              <button
                disabled={newListName === ""}
                onClick={() => {
                  const newList: ListType[] = [
                    ...lists,
                    { id: (lists.length + 1).toString(), name: newListName },
                  ];
                  setLists(newList);
                  setIsAddingNewList(false);
                }}
                className={
                  "cursor-pointer rounded-md bg-blue-600 p-3 hover:bg-blue-500 disabled:bg-gray-600"
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
                containerHoverColor={"gray"}
                cursor={"pointer"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
