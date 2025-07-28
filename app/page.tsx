import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Recents from "@/components/homepage/Recents";
import Workspaces from "@/components/homepage/Workspaces";

export default function Home() {
  return (
    <div className="min-h-screen sm:font-[family-name:var(--font-geist-sans)]">
      <Header isLoggedIn={true} />
      <main className="grid grid-cols-[1fr_2fr] gap-[32px] pt-10">
        <SideBar />
        <div className={"flex w-4/5 flex-col gap-20"}>
          <Recents />
          <Workspaces />
        </div>
      </main>
    </div>
  );
}
