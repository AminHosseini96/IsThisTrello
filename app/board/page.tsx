"use client";

import Header from "@/components/Header";
import React from "react";
import BoardPageHeader from "@/components/boardpage/BoardPageHeader";
import ListItem from "@/components/boardpage/ListItem";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";
import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type * as CSSTypes from "csstype";
import {
  DndContext,
  closestCenter,
  PointerSensor,
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

const iconStyles = tv({
  base: "h-6 w-6",
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

const iconContainerStyles = tv({
  base: "flex aspect-square h-full cursor-pointer items-center justify-center rounded-lg hover:bg-gray-700",
});

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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 8,
      },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over?.id && over) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over.id);
      setLists((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  React.useEffect(() => {
    if (isAddingNewList) {
      inputRef.current?.focus();
    }
  }, [isAddingNewList]);

  return (
    <div className={"flex h-dvh w-full flex-col"}>
      <Header isLoggedIn={true} />
      <BoardPageHeader name={"Board"} />
      <div
        className={
          "flex w-full grow flex-row gap-5 overflow-x-auto scroll-auto bg-blue-400 p-5"
        }
      >
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
            className={
              "flex h-16 w-96 min-w-96 cursor-pointer flex-row items-center gap-2 rounded-xl bg-blue-500 p-4 hover:bg-blue-600"
            }
          >
            <PlusIcon className={iconStyles()} />
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
                  "cursor-pointer rounded-xl bg-blue-500 p-3 text-lg hover:bg-blue-400 disabled:bg-gray-600"
                }
              >
                Add list
              </button>
              <div className={iconContainerStyles()}>
                <XMarkIcon
                  onClick={() => setIsAddingNewList(false)}
                  className={iconStyles()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
