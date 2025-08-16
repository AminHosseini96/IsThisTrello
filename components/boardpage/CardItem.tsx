"use client";

import { CardItemMenu } from "@/components/boardpage";
import { useUiStore } from "@/stores";
import { cardStyles } from "@/styles/card";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  cardName: string;
}

export default function CardItem({ cardName }: Props): React.ReactNode {
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState(cardName);
  const [prevName, setPrevName] = useState(cardName);
  const { ui } = useUiStore();

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
        className={cardStyles({
          isMenuOpen: showMenu ? "open" : "closed",
          color: ui.colorTheme,
        })}
      >
        <div className="relative flex items-center gap-2">
          <div
            onClick={() => setChecked(!checked)}
            className={
              "absolute h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-all delay-150 duration-300 " +
              (checked
                ? "flex scale-100 bg-emerald-600 opacity-100"
                : "scale-75 opacity-0 group-hover:flex group-hover:scale-100 group-hover:opacity-100") +
              (!checked ? " border-2 border-slate-200" : "") +
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
            className={`absolute right-0 cursor-pointer rounded-md p-2 transition-opacity delay-50 duration-300 group-hover:opacity-100 ${showMenu ? "bg-slate-600 opacity-100 hover:bg-slate-500" : "opacity-0 hover:bg-slate-600"}`}
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
            "font-bol relative z-50 mt-2 cursor-pointer rounded-lg bg-sky-500 p-2 text-lg hover:bg-sky-600"
          }
        >
          Save
        </button>
      )}
      {showMenu && <CardItemMenu ref={menuRef} />}
    </div>
  );
}
