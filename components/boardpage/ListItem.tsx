import { AppButton, Icon } from "@/components/common";
import { AppInput } from "@/components/common/AppInput";
import useCardStore from "@/stores/cardStore";
import { ListData } from "@/types";
import { cn } from "@/utils";
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import ListItemMenu from "@/components/boardpage/ListItemMenu";
import { CardItem } from "@/components/boardpage";
import {
  arrayMove,
  verticalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

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
    <div
      className={"group flex w-full flex-row items-center rounded-xl"}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <CardItem cardName={name} />
    </div>
  );
}

interface Props {
  listData?: ListData;
}

export default function ListItem({ listData }: Props) {
  const { createCard } = useCardStore();
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>("");
  const [newListName, setNewListName] = useState<string>("");
  const [prevListName] = useState<string>(listData?.name ? listData.name : "");
  const [isEditingListName, setIsEditingListName] = useState<boolean>(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [lists, setLists] = React.useState<ListType[]>([
    { id: "1", name: "First" },
    { id: "2", name: "Second" },
    { id: "3", name: "Third" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setNewCardName("");
    // if (isAddingCard) {
    //   inputRef.current?.focus();
    // }
  }, [isAddingCard]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over?.id && over) {
      const oldIndex = lists.findIndex((item) => item.id === active.id);
      const newIndex = lists.findIndex((item) => item.id === over.id);
      setLists((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  const handleAddingNewCard = async () => {
    if (listData?.id) await createCard(newCardName, listData?.id);
    setIsAddingCard(false);
  };

  const handleEditListName = async () => {
    setIsEditingListName(false);
  };

  useEffect(() => {
    console.log(
      "%c newListName",
      "color: white; background: #007acc; padding: 2px 6px; border-radius: 4px",
      newListName,
    );
  }, [newListName]);

  return (
    <div
      className={
        "flex max-h-fit w-96 min-w-96 flex-col gap-2 rounded-b-xl px-4 pb-4"
      }
    >
      <div className={"relative flex flex-row items-center justify-between"}>
        {!isEditingListName ? (
          <span
            onClick={() => {
              setIsEditingListName(true);
            }}
            className={"mr-auto border-2 border-transparent px-2 py-2 text-xl"}
          >
            {prevListName}
          </span>
        ) : (
          <AppInput
            value={prevListName}
            placeholder={prevListName}
            textSize={"xl"}
            autoFocus={true}
            onChange={(name) => {
              setNewListName(name);
            }}
            onBlur={handleEditListName}
          />
        )}
        <Icon
          icon={EllipsisHorizontalIcon}
          action={() => {
            setShowMenu(!showMenu);
          }}
          cursor={"pointer"}
          containerHoverColor={"slate"}
          containerSize={"sm"}
        />
        {showMenu && <ListItemMenu ref={menuRef} />}
      </div>
      <div className={"flex w-full flex-col gap-1"}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={(event) => setActiveId(String(event.active.id))}
        >
          <SortableContext
            items={lists.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
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
      <div
        className={cn(
          "relative overflow-hidden rounded-lg px-2 transition-all duration-300",
          isAddingCard ? "max-h-46 bg-slate-900/50" : "max-h-16",
        )}
      >
        <div
          onClick={() => {
            setShowMenu(false);
            setIsAddingCard(true);
          }}
          className={cn(
            "mt-3 flex h-10 w-full cursor-pointer flex-row items-center rounded-lg opacity-50 hover:opacity-100",
            isAddingCard && "opacity-100",
          )}
        >
          <Icon icon={PlusIcon} />
          <span className={"text-lg"}>Add a card</span>
        </div>
        {isAddingCard && (
          <div className={cn("mt-3 mb-2 flex flex-col rounded-xl")}>
            <AppInput
              value={newCardName}
              onChange={(name) => {
                setNewCardName(name);
              }}
              ref={inputRef}
              placeholder={"Enter a card name . . ."}
            />
            <div className={"mt-2 flex flex-row items-center gap-3"}>
              <AppButton
                action={handleAddingNewCard}
                disabled={newCardName === ""}
                label={"Add Card"}
              />
              <AppButton
                color={"error"}
                shape={"circle"}
                rounded={"full"}
                action={() => {
                  setIsAddingCard(false);
                }}
                icon={<Icon icon={XMarkIcon} />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
