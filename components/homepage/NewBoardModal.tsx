"use client";

import React, { forwardRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useRouter } from "next/navigation";

const menuItemStyle = tv({
  base: "flex h-12 flex-row items-center hover:bg-gray-600 pl-2 pr-2 rounded-lg",
  variants: {
    justify: {
      between: "justify-between",
      none: "gap-2",
    },
  },
  defaultVariants: {
    justify: "between",
  },
});

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

const colorClasses = {
  purple: "bg-purple-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
  lime: "bg-lime-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
  red: "bg-red-200",
  pink: "bg-pink-200",
};

const NewBoardModal = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  const [color, setColor] = useState<string>(colorClasses.blue);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="absolute top-16 right-0 z-50 flex w-96 flex-col gap-1 rounded-xl border border-gray-400 bg-gray-700 p-4"
    >
      <span className={"mt-2 mb-2 text-sm font-bold"}>Color</span>
      <div
        className={"flex w-full flex-wrap items-center justify-center gap-2"}
      >
        {Object.values(colorClasses).map((color, index) => (
          <div
            key={index}
            className={`h-10 w-20 rounded-md hover:border-b-4 hover:border-blue-400 ${color}`}
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
