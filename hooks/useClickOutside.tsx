import React, { useEffect } from "react";

interface Props {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
  when: boolean;
}

export default function useClickOutside({ ref, handler, when = true }: Props) {
  useEffect(() => {
    if (!when) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handler, when]);
}
