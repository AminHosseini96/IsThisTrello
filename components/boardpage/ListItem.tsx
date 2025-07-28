import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";
import ListItemMenu from "@/components/boardpage/ListItemMenu";

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

interface Props {
  name: string;
}

export default function ListItem({ name }: Props) {
  const [showMenu, setShowMenu] = React.useState(false);
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

  return (
    <div
      className={
        "flex max-h-fit w-96 min-w-96 flex-col gap-2 rounded-xl bg-gray-900 p-4"
      }
    >
      <div className={"flex flex-row items-center"}>
        <span className={"mr-auto text-xl"}>{name}</span>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className={iconContainerStyles()}
        >
          <EllipsisHorizontalIcon className={iconStyles()} />
          {showMenu && <ListItemMenu ref={menuRef} />}
        </div>
      </div>
      <div className={"flex h-60 w-full flex-col rounded-xl bg-gray-700"}></div>
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
