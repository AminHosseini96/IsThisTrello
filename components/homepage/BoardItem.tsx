"use client";

import { Icon } from "@/components/common";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFill } from "@heroicons/react/24/solid";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  boardName: string;
  color: "green" | "red" | "blue" | "yellow" | "orange" | "pink" | "purple";
}

const colorClasses = {
  green: "bg-green-200",
  red: "bg-red-200",
  blue: "bg-blue-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
  pink: "bg-pink-200",
  purple: "bg-purple-200",
  lime: "bg-lime-200",
};

export default function BoardItem({ boardName, color }: Props) {
  const router = useRouter();
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div
      onClick={() => router.push("/board")}
      className="group relative flex h-36 w-60 cursor-pointer flex-col overflow-hidden"
    >
      <div
        onClick={() => {
          setIsLiked((prev) => !prev);
        }}
        className={
          "absolute top-3 right-[-40px] z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-600 opacity-0" +
          " translate-x-[-20px] transform" +
          " transition-all duration-400 ease-in-out" +
          " group-hover:right-3 group-hover:translate-x-0 group-hover:opacity-100"
        }
      >
        {!isLiked ? (
          <Icon icon={StarIcon} containerSize={"sm"} />
        ) : (
          <Icon
            icon={StarIconFill}
            iconStyle={"text-yellow-400"}
            containerSize={"sm"}
          />
        )}
      </div>
      <div
        className={
          "absolute z-0 hidden h-36 w-60 rounded-xl bg-gray-600 opacity-40 group-hover:block"
        }
      />
      <div
        className={`${colorClasses[color]} flex h-28 w-full justify-end rounded-t-xl`}
      />
      <div
        className={
          "z-10 flex h-12 w-full items-center rounded-b-xl bg-gray-900 p-2"
        }
      >
        <span>{boardName}</span>
      </div>
    </div>
  );
}
