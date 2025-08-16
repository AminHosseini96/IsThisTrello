"use client";

import { Icon, ProfileMenu } from "@/components/common/index";
import { useClickOutside } from "@/hooks";
import { useUserStore } from "@/stores";
import { cn } from "@/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

interface Props {
  action?: () => void;
  isMenuEnabled?: boolean;
  isOwner?: boolean;
}

const containerStyles = tv({
  base: "relative mr-2 ml-2 flex aspect-square w-12 cursor-pointer items-center box-border justify-center rounded-full border-2 border-indigo-200  hover:border-indigo-800/50",
  variants: {
    color: {
      colored: "bg-indigo-200",
      transparent: "bg-transparent",
    },
  },
});

export default function Avatar({
  action,
  isOwner = false,
  isMenuEnabled,
}: Props) {
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
        className={cn(
          containerStyles({ color: "colored" }),
          isMenuEnabled && showProfileMenu && "border-indigo-800/50",
        )}
      >
        <span className={"box-border text-4xl text-indigo-800/70"}>
          {user?.name.slice(0, 1).toUpperCase()}
        </span>
        {isMenuEnabled && showProfileMenu && <ProfileMenu ref={menuRef} />}
        {isOwner && (
          <Icon
            icon={CheckBadgeIcon}
            rounded={"full"}
            containerStyle={"absolute right-[-5] bottom-[-5] bg-sky-600 p-0"}
          />
        )}
      </div>
    );
}
