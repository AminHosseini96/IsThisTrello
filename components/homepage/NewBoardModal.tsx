"use client";

import { createBoard } from "@/services/boardServices";
import React, { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = object;

const colorClasses = {
  purple: "bg-purple-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
  lime: "bg-lime-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
  red: "bg-red-200",
  pink: "bg-pink-200",
} as const;
type ColorName = keyof typeof colorClasses;

const NewBoardModal = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  const [color, setColor] = useState<string>(colorClasses.purple);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const submitNewBoard = async () => {
    const newBoard = {
      name: title,
      color: color,
      createdAt: new Date(),
      lists: [],
    };

    await createBoard(newBoard);
    router.push("/board");
  };

  return (
    <div
      ref={ref}
      className="absolute top-18 right-3 z-50 flex w-96 flex-col gap-1 rounded-xl border border-gray-400 bg-gray-700 p-4"
    >
      <span className={"mt-2 mb-2 text-sm font-bold"}>Color</span>
      <div
        className={"flex w-full flex-wrap items-center justify-center gap-2"}
      >
        {(Object.keys(colorClasses) as ColorName[]).map((colorName, index) => (
          <div
            onClick={() => setColor(colorClasses[colorName])}
            key={index}
            className={`h-10 w-20 cursor-pointer rounded-md ${colorClasses[colorName] === color ? "opacity-100" : "opacity-50 hover:opacity-100"} ${colorClasses[colorName]}`}
          />
        ))}
      </div>
      <span className={"mt-2 mb-2 text-sm font-bold"}>
        Board title <span className={"text-red-400"}>*</span>
      </span>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder={"Title"}
        className={`${title === "" ? "border-red-400 focus:border-red-400" : "border-blue-300 focus:border-blue-300"} rounded-md border-2 p-2 text-lg focus:ring-0 focus:outline-none`}
      />
      <button
        onClick={async () => {
          await submitNewBoard();
        }}
        disabled={title === ""}
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Create
      </button>
    </div>
  );
});

NewBoardModal.displayName = "NewBoardModal";
export default NewBoardModal;
