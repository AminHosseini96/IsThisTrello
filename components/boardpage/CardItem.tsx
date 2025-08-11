"use client";

import { CardItemMenu } from "@/components/boardpage";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  cardName: string;
}

export default function CardItem({ cardName }: Props): React.ReactNode {
  const [checked, setChecked] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [name, setName] = React.useState(cardName);
  const [prevName, setPrevName] = React.useState(cardName);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nameSpanRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (inputRef.current && nameSpanRef.current) {
      const width = nameSpanRef.current.offsetWidth;
      inputRef.current.style.width = `${width + 10}px`;
    }
  }, [name, showMenu]);

  useEffect(() => {
    if (showMenu) {
      inputRef.current?.focus();
    }
  }, [showMenu]);

  return (
    <div className={`group relative flex grow`}>
      {showMenu && (
        <div
          className={
            "absolute -top-3 -left-4 z-10 h-[25rem] w-[33rem] rounded-xl bg-black/90"
          }
        />
      )}
      <div
        className={`relative ${showMenu ? "z-30 min-h-32 bg-gray-600" : "z-0 min-h-16 bg-gray-700"} box-border flex h-fit w-full flex-col rounded-xl ${showMenu ? "" : "border-2 group-hover:border-white"} border-transparent p-3 transition-all duration-100`}
      >
        <div className="relative flex items-center gap-2">
          <div
            onClick={() => setChecked(!checked)}
            className={
              "absolute h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-all delay-150 duration-300 " +
              (checked
                ? "flex scale-100 bg-green-600 opacity-100"
                : "scale-75 opacity-0 group-hover:flex group-hover:scale-100 group-hover:opacity-100") +
              (!checked ? " border-2 border-gray-200" : "") +
              `${showMenu ? "block scale-100 opacity-100" : ""}`
            }
          >
            <CheckIcon
              className={`h-4 w-4 text-white transition-opacity duration-300 ${checked ? "opacity-100" : "opacity-0"} `}
            />
          </div>
          <input
            ref={inputRef}
            className={`ml-7 pl-1 ${showMenu ? "block" : "hidden"}`}
            placeholder={name}
            onClick={(event) => event.stopPropagation()}
            onFocus={() => setPrevName(name)}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span
            className={
              showMenu || checked
                ? `ml-8 ${showMenu ? "hidden" : ""}`
                : !checked
                  ? "block transition-all delay-150 duration-300 group-hover:translate-x-8"
                  : ""
            }
          >
            {name}
          </span>
          <span
            ref={nameSpanRef}
            className="invisible absolute text-base whitespace-pre"
          >
            {name || "a"}
          </span>

          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              if (showMenu) {
                setName(prevName);
              }
              setShowMenu((prev) => !prev);
            }}
            className={`absolute right-0 cursor-pointer rounded-md p-2 transition-opacity delay-50 duration-300 group-hover:opacity-100 ${showMenu ? "bg-gray-600 opacity-100 hover:bg-gray-500" : "opacity-0 hover:bg-gray-600"}`}
          >
            {!showMenu ? (
              <PencilIcon className={`h-4 w-4 text-white`} />
            ) : (
              <XMarkIcon className={`h-4 w-4 text-white`} />
            )}
          </div>
        </div>
      </div>
      {showMenu && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setShowMenu(false)}
          className={
            "font-bol relative z-50 mt-2 cursor-pointer rounded-lg bg-blue-500 p-2 text-lg hover:bg-blue-600"
          }
        >
          Save
        </button>
      )}
      {showMenu && <CardItemMenu ref={menuRef} />}
    </div>
  );
}
