"use client";

import { Icon } from "@/components/common/";
import Avatar from "@/components/common/Avatar";
import { useUiStore } from "@/stores";
import { cn } from "@/utils";
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
import React, { JSX } from "react";

const headerSectionsStyles = tv({
  base: "flex flex-row items-center h-full p-1 gap-1 ",
});

export default function Header(): JSX.Element {
  const isLoading = useUiStore((state) => state.ui.isLoading);
  const isLoggedIn = useUiStore((state) => state.ui.isLoggedIn);
  const setUi = useUiStore((state) => state.setUi);
  const ui = useUiStore((state) => state.ui);

  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <header
      className={cn(
        "h-16 w-full border-b border-b-gray-400",
        isLoading && "opacity-0",
      )}
    >
      {isLoggedIn ? (
        <div className={"grid grid-cols-[1fr_3fr_1fr]"}>
          <div className={headerSectionsStyles()}>
            <Icon
              icon={Squares2X2Icon}
              containerHoverColor={"gray"}
              cursor={"pointer"}
            />
            <div
              onClick={goHome}
              className={
                "flex cursor-pointer flex-row items-center justify-between rounded-lg p-2 hover:bg-gray-700"
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
          <div
            className={cn(
              headerSectionsStyles(),
              "w-full justify-center justify-self-center px-48",
            )}
          >
            <div className={"relative flex w-full items-center justify-center"}>
              <Icon
                icon={MagnifyingGlassIcon}
                color={"gray"}
                containerSize={"sm"}
                containerStyle={"absolute left-4"}
              />
              <input
                type={"text"}
                placeholder={"Search"}
                className={
                  "m-2 h-full w-full rounded-lg border-2 border-blue-200 bg-gray-800 p-2 pl-10"
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
          <div className={cn(headerSectionsStyles(), "justify-self-end")}>
            <Icon
              icon={MegaphoneIcon}
              containerHoverColor={"gray"}
              cursor={"pointer"}
            />
            <Icon
              icon={BellIcon}
              containerHoverColor={"gray"}
              cursor={"pointer"}
            />
            <Icon
              icon={QuestionMarkCircleIcon}
              containerHoverColor={"gray"}
              cursor={"pointer"}
            />
            <Avatar isMenuEnabled={true} />
          </div>
        </div>
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
              onClick={() => {
                console.log(ui);
                setUi({ isSignedUp: true });
              }}
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
