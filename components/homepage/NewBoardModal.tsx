"use client";

import { useBoardStore, useUiStore } from "@/stores";
import React, { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = object;

const colorClasses = {
  violet: "bg-violet-200",
  sky: "bg-sky-200",
  emerald: "bg-emerald-200",
  lime: "bg-lime-200",
  amber: "bg-amber-200",
  orange: "bg-orange-200",
  rose: "bg-rose-200",
  pink: "bg-pink-200",
} as const;
type ColorName = keyof typeof colorClasses;

const NewBoardModal = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  const [color, setColor] = useState<string>(colorClasses.violet);
  const [title, setTitle] = useState<string>("");
  const { createBoard } = useBoardStore();
  const { setUi } = useUiStore();

  const router = useRouter();

  const submitNewBoard = async () => {
    setUi({ isBoardEmpty: true });
    await createBoard(title, color);
    router.push("/board");
  };

  return (
    <div
      ref={ref}
      className="absolute top-18 right-3 z-50 flex w-96 flex-col gap-1 rounded-xl border border-slate-400 bg-slate-700 p-4"
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
        Board title <span className={"text-rose-400"}>*</span>
      </span>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder={"Title"}
        className={`${title === "" ? "border-rose-400 focus:border-rose-400" : "border-sky-300 focus:border-sky-300"} rounded-md border-2 p-2 text-lg focus:ring-0 focus:outline-none`}
      />
      <button
        onClick={async () => {
          await submitNewBoard();
        }}
        disabled={title === ""}
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-600"
      >
        Create
      </button>
    </div>
  );
});

NewBoardModal.displayName = "NewBoardModal";
export default NewBoardModal;
