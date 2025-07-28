"use client";

import {
  BellIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { useRouter } from "next/navigation";
import { JSX, ReactNode, useEffect, useRef, useState } from "react";
import ProfileMenu from "@/components/ProfileMenu";

const iconStyles = tv({
  base: "h-6 w-6 m-2",
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

const iconContainerStyles = tv({
  base: "flex aspect-square h-full cursor-pointer items-center justify-center rounded-lg hover:bg-gray-700",
});

const headerSectionsStyles = tv({
  base: "flex flex-row items-center h-full p-1",
});

interface HeaderProps {
  isLoggedIn: boolean;
  loginAction?: () => void;
}

export default function Header({
  isLoggedIn = false,
  loginAction,
}: HeaderProps): JSX.Element {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const goLogin = () => {
    router.push("/login");
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    if (showProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header
      className={
        "flex h-16 w-full items-center justify-between border-b border-b-gray-400"
      }
    >
      {isLoggedIn ? (
        <>
          <div className={headerSectionsStyles()}>
            <div onClick={goLogin} className={iconContainerStyles()}>
              <Squares2X2Icon className={iconStyles()} />
            </div>
            <div
              onClick={goHome}
              className={
                "flex h-full cursor-pointer flex-row items-center justify-between rounded-lg p-2 hover:bg-gray-700"
              }
            >
              <Image
                alt={""}
                src={"/assets/trello_icon.png"}
                width={30}
                height={30}
                className={"ml-2 rounded-md bg-white"}
              />
              <span className={"center ml-2 text-2xl text-white"}>
                IsThisTrello
              </span>
            </div>
          </div>
          <div className={headerSectionsStyles()}>
            <div className={"relative flex items-center justify-center"}>
              <div className={"absolute left-3 w-full"}>
                <MagnifyingGlassIcon
                  className={iconStyles({ color: "gray" })}
                />
              </div>
              <input
                type={"text"}
                placeholder={"Search"}
                className={
                  "m-2 h-full w-200 rounded-lg border-2 border-blue-200 bg-gray-800 p-2 pl-10"
                }
              />
            </div>
            <button
              className={
                "rounded-sm bg-blue-600 p-2 text-white hover:bg-blue-500"
              }
            >
              Create
            </button>
          </div>
          <div className={headerSectionsStyles()}>
            <div className={iconContainerStyles()}>
              <MegaphoneIcon className={iconStyles()} />
            </div>
            <div className={iconContainerStyles()}>
              <BellIcon className={iconStyles()} />
            </div>
            <div className={iconContainerStyles()}>
              <QuestionMarkCircleIcon className={iconStyles()} />
            </div>
            <div
              onClick={() => setShowProfileMenu((prevState) => !prevState)}
              className={
                "relative mr-2 ml-2 flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full bg-orange-200"
              }
            >
              <span className={"text-4xl text-gray-700"}>A</span>
              {showProfileMenu && <ProfileMenu ref={menuRef} />}
            </div>
          </div>
        </>
      ) : (
        <div
          className={"flex h-full w-full flex-row items-center justify-evenly"}
        >
          <div className={"flex h-full flex-row items-center p-2"}>
            <Image
              alt={""}
              src={"/assets/trello_icon.png"}
              width={30}
              height={30}
              className={"ml-2 rounded-md bg-white"}
            />
            <span className={"center ml-2 text-2xl text-white"}>
              IsThisTrello
            </span>
          </div>
          <div className={"flex h-full flex-row items-center"}>
            <div
              className={
                "flex h-full cursor-pointer items-center p-5 hover:bg-gray-600"
              }
              onClick={loginAction}
            >
              <span className={"text-xl"}>Login</span>
            </div>
            <div
              className={
                "flex h-full cursor-pointer items-center bg-blue-500 p-5 hover:bg-blue-400"
              }
            >
              <span className={"text-xl"}>Get IsThisTrello for free</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
