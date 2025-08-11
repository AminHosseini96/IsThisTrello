"use clinet";

import { ProfileMenu } from "@/components/common/index";
import { useClickOutside } from "@/hooks";
import { useUserStore } from "@/stores";
import React, { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

interface Props {
  action?: () => void;
  isMenuEnabled?: boolean;
}

const containerStyles = tv({
  base: "relative mr-2 ml-2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full",
  variants: {
    color: {
      colored: "bg-sky-200",
      transparent: "bg-transparent",
    },
  },
});

export default function Avatar({ action, isMenuEnabled }: Props) {
  //States
  const { user } = useUserStore();
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  //Refs
  const menuRef = useRef<HTMLDivElement | null>(null);

  //Hooks
  useEffect(() => {
    if (user?.avatar && user.avatar.length > 0) setHasAvatar(true);
  }, []);

  useClickOutside({
    ref: menuRef as React.RefObject<HTMLDivElement>,
    handler: () => {
      setShowProfileMenu(false);
    },
    when: showProfileMenu,
  });

  //Helpers

  if (!hasAvatar)
    return (
      <div
        onClick={() => (isMenuEnabled ? setShowProfileMenu(true) : action)}
        className={containerStyles({ color: "colored" })}
      >
        <span className={"text-4xl text-sky-800"}>
          {user?.name.slice(0, 1).toUpperCase()}
        </span>
        {isMenuEnabled && showProfileMenu && <ProfileMenu ref={menuRef} />}
      </div>
    );
}
