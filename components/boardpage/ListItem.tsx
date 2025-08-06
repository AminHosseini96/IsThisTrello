import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";
import ListItemMenu from "@/components/boardpage/ListItemMenu";
import CardItem from "@/components/boardpage/CardItem";
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

const iconContainerStyles = tv({
  base: "flex aspect-square h-full cursor-pointer items-center justify-center rounded-lg hover:bg-gray-700 relative",
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
    <div
      className={
        "group flex w-full flex-row items-center rounded-xl bg-gray-700"
      }
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
  name: string;
}

export default function ListItem({ name }: Props) {
  const [showMenu, setShowMenu] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [lists, setLists] = React.useState<ListType[]>([
    { id: "1", name: "First" },
    { id: "2", name: "Second" },
    { id: "3", name: "Third" },
  ]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 8,
      },
    }),
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      className={
        "flex max-h-fit w-96 min-w-96 flex-col gap-2 rounded-b-xl bg-gray-900 px-4 pb-4"
      }
    >
      <div className={"flex flex-row items-center"}>
        <span className={"mr-auto text-xl"}>{name}</span>
        <div
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className={iconContainerStyles()}
        >
          <EllipsisHorizontalIcon className={iconStyles()} />
          {showMenu && <ListItemMenu ref={menuRef} />}
        </div>
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
        className={
          "flex h-10 w-full cursor-pointer flex-row items-center rounded-xl hover:bg-gray-800"
        }
      >
        <PlusIcon className={iconStyles()} />
        <span className={"text-xl"}>Add a card</span>
      </div>
    </div>
  );
}
