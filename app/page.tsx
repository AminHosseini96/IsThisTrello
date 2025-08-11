"use client";

import { LoadingScreen } from "@/components/common";
import { Recents, SideBar, Workspaces } from "@/components/homepage";
import { useUiStore } from "@/stores";
import { useEffect } from "react";
import { auth } from "@/services/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { fetchAndStoreUserData } from "@/services/userHelpers";

export default function Home() {
  const loading = useUiStore((state) => state.ui.isLoading);
  const router = useRouter();
  const setUi = useUiStore((state) => state.setUi);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUi({ isLoggedIn: false });
        router.replace("/login");
      } else {
        await fetchAndStoreUserData(firebaseUser.uid);
        setUi({ isLoggedIn: true, isLoading: false });
      }
    });
    return () => unsubscribe();
  }, [router, setUi]);

  if (loading) return <LoadingScreen />;

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
