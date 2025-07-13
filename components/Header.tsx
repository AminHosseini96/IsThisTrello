import {
    BellIcon,
    MagnifyingGlassIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {tv} from "tailwind-variants";

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
})
const headerSectionsStyles = tv({
    base: "flex flex-row items-center h-full p-1"
})

export default function Header () {
    return (
        <header className={"flex bg-gray- border-b-blue-100 border-b-1 h-16 w-full items-center justify-between pt-2 pb-2 p-1"}>
            <div className={headerSectionsStyles()}>
                <Squares2X2Icon className={iconStyles()}/>
                <Image alt={""} src={"/assets/trello_icon.png"} width={30} height={30} className={"bg-white rounded-md ml-2"} />
                <span className={"text-white text-2xl center ml-2 "}>
                IsThisTrello
            </span>
            </div>
            <div className={headerSectionsStyles()}>
                <div className={"relative flex items-center justify-center w-200"}>
                    <div className={"absolute left-3 w-full"}>
                        <MagnifyingGlassIcon className={iconStyles({color:"gray"})}/>
                    </div>
                    <input type={"text"} placeholder={"Search"} className={"w-200 border-2 h-full m-2 p-2 pl-10 rounded-lg border-blue-200 bg-gray-800"}/>
                </div>
                <button className={"bg-blue-500 rounded-sm text-white p-2 "}>Create</button>
            </div>
            <div className={headerSectionsStyles()}>
                <MegaphoneIcon className={iconStyles()}/>
                <BellIcon className={iconStyles()}/>
                <QuestionMarkCircleIcon className={iconStyles()}/>
            </div>
        </header>
    )
}