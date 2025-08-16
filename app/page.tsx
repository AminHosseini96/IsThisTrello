"use client";

import { LoadingScreen } from "@/components/common";
import { Recents, SideBar, Workspaces } from "@/components/homepage";
import { useBoardStore, useUiStore } from "@/stores";
import useListStore from "@/stores/listStore";
import { useEffect } from "react";
import { auth } from "@/services/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { fetchAndStoreUserData } from "@/services/userHelpers";

export default function Home() {
  const isLoading = useUiStore((state) => state.ui.isLoading);
  const router = useRouter();
  const pathname = usePathname();
  const setUi = useUiStore((state) => state.setUi);
  const { fetchBoardsRealtime, loading } = useBoardStore();
  const { setLists } = useListStore();

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (
        args.some(
          (arg) =>
            typeof arg === "string" &&
            (arg.includes("[Fast Refresh]") ||
              arg.includes("turbopack-hot-reloader")),
        )
      ) {
        return;
      }
      originalConsoleLog(...args);
    };
  }, []);

  useEffect(() => {
    setLists([]);
  }, [pathname]);

  useEffect(() => {
    let unsubscribeBoards: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUi({ isLoggedIn: false });
        if (pathname !== "/login") router.replace("/login");
      } else {
        await fetchAndStoreUserData(firebaseUser.uid);
        unsubscribeBoards = fetchBoardsRealtime();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeBoards) unsubscribeBoards();
    };
  }, [pathname, router, setUi]);

  useEffect(() => {
    setUi({ isLoading: loading });
  }, [loading]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div
      className="flex w-full flex-col sm:font-[family-name:var(--font-geist-sans)]"
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      <main className="mx-auto grid grid-cols-[2fr_5fr] gap-[32px] px-32">
        <SideBar />
        <div className={"flex max-w-[1020px] flex-col gap-20"}>
          <Recents />
          <Workspaces />
        </div>
      </main>
    </div>
  );
}
