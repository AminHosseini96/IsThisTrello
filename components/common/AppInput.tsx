"use client";

import { cn } from "@/utils";
import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  ForwardedRef,
} from "react";

interface Props {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  resizable?: boolean;
  className?: string;
  autoFocus?: boolean;
  textSize?: "sm" | "md" | "lg" | "xl";
}

export const AppInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      className,
      onChange,
      textSize = "md",
      resizable = false,
      placeholder,
      onBlur,
      autoFocus = false,
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const spanRef = useRef<HTMLSpanElement>(null);

    const [inputValue, setInputValue] = useState(value || "");
    const [inputWidth, setInputWidth] = useState(
      Number(spanRef.current?.offsetWidth),
    );

    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (resizable && spanRef.current) {
        requestAnimationFrame(() => {
          const width = spanRef.current!.offsetWidth + 10;
          setInputWidth(width);
        });
      }
    }, [inputValue, resizable, textSize]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (inputValue !== "") {
          inputRef.current?.blur();
        }
      }
      if (e.key === "Escape") {
        setInputValue("");
        inputRef.current?.blur();
      }
    };

    return (
      <div
        className={`relative inline-flex items-center ${!resizable && "w-full"}`}
      >
        {resizable && (
          <span
            ref={spanRef}
            className={cn(
              "invisible absolute whitespace-pre",
              `text-${textSize}`,
              "px-2 py-1",
            )}
          >
            {" "}
            {inputValue || " "}
          </span>
        )}

        <input
          ref={inputRef}
          value={inputValue}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          onBlur={() => (onBlur ? onBlur(inputValue) : {})}
          onChange={handleChange}
          style={resizable ? { width: `${inputWidth}px` } : { width: "100%" }}
          className={cn(
            "rounded-md py-2 pl-2 transition-all duration-150 outline-none " +
              "border-2 border-transparent focus:border-b-indigo-400 focus:bg-slate-900/30",
            !resizable ? "border-indigo-400/50" : "",
            `text-${textSize}`,
            className,
          )}
        />
      </div>
    );
  },
);

AppInput.displayName = "AppInput";
export default AppInput;
