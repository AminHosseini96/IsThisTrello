"use client";

import { Icon } from "@/components/common/";
import Avatar from "@/components/common/Avatar";
import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Divider } from "@mui/material";
import { logoutUser } from "@/services/authServices";
import { useRouter } from "next/navigation";

type Props = object;

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

const ProfileMenu = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  return (
    <div
      ref={ref}
      className="absolute top-16 right-0 z-50 flex w-96 flex-col gap-1 rounded-xl border border-gray-400 bg-gray-700 p-4"
    >
      <span className={"mt-2 mb-2 text-sm font-bold"}>ACCOUNT</span>
      <div className={"flex flex-row items-center"}>
        <Avatar isMenuEnabled={false} />
        <div className={"flex flex-col gap-2"}>
          <span>Amin Karandish</span>
          <span>karandsh.mamin@gmail.com</span>
        </div>
      </div>
      <div className={menuItemStyle()}>
        <span>Switch accounts</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Manage account</span>
        <Icon icon={ArrowTopRightOnSquareIcon} containerSize={"sm"} />
      </div>
      <Divider className={"bg-gray-400"} />
      <span className={"mt-2 mb-2 text-sm font-bold"}>IsThisTrello</span>
      <div className={menuItemStyle()}>
        <span>Profile and visibility</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Activity</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Cards</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Settings</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Theme</span>
        <Icon icon={ChevronRightIcon} containerSize={"sm"} />
      </div>
      <Divider className={"bg-gray-400"} />
      <div className={menuItemStyle({ justify: "none" })}>
        <Icon icon={UsersIcon} containerSize={"sm"} />
        <span>Create Workspace</span>
      </div>
      <Divider className={"bg-gray-400"} />
      <div className={menuItemStyle()}>
        <span>Help</span>
      </div>
      <div className={menuItemStyle()}>
        <span>Shortcuts</span>
      </div>
      <Divider className={"bg-gray-400"} />
      <div onClick={() => logout()} className={menuItemStyle()}>
        <span>Log out</span>
      </div>
    </div>
  );
});

ProfileMenu.displayName = "ProfileMenu";
export default ProfileMenu;
