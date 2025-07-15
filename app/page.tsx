import { tv } from "tailwind-variants";
import Header from "@/components/Header";
import BoardItem from "@/components/homepage/BoardItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className=" min-h-screen sm:font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="grid grid-cols-[1fr_2fr] gap-[32px]  pt-10 ">
        <SideBar />
        <div className={"flex flex-col gap-5"}>
          <span className={"font-light text-2xl text-white"}>
            Recently Viewed
          </span>
          <div className={"flex flex-row gap-5"}>
            <BoardItem boardName={"Workspace"} color={"yellow"} />
            <BoardItem boardName={"Workspace"} color={"yellow"} />
            <BoardItem boardName={"Workspace"} color={"yellow"} />
            <BoardItem boardName={"Workspace"} color={"yellow"} />
          </div>
        </div>
      </main>
    </div>
  );
}
