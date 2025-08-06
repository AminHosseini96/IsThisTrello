"use client";

import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Recents from "@/components/homepage/Recents";
import Workspaces from "@/components/homepage/Workspaces";
import { useEffect, useState } from "react";
import { auth } from "@/services/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserStore } from "@/stores/userStore";
import { fetchAndStoreUserData } from "@/services/userHelpers";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/login");
      } else {
        await fetchAndStoreUserData(firebaseUser.uid);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen max-w-screen sm:font-[family-name:var(--font-geist-sans)]">
      <Header isLoggedIn={true} />
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
