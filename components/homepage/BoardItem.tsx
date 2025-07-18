import { StarIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

interface Props {
  boardName: string;
  color: "green" | "red" | "blue" | "yellow" | "orange" | "pink" | "purple";
}

const iconStyles = tv({
  base: "h-6 w-6",
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

const colorClasses = {
  green: "bg-green-200",
  red: "bg-red-200",
  blue: "bg-blue-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
  pink: "bg-pink-200",
  purple: "bg-purple-200",
};

export default function BoardItem({ boardName, color }: Props) {
  return (
    <div className="group relative flex h-40 w-60 cursor-pointer flex-col overflow-hidden">
      <div
        className={
          "absolute top-3 right-[-40px] z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-600 opacity-0" +
          " translate-x-[-20px] transform" +
          " transition-all duration-400 ease-in-out" +
          " group-hover:right-3 group-hover:translate-x-0 group-hover:opacity-100"
        }
      >
        <StarIcon className={iconStyles()} />
      </div>
      <div
        className={
          "absolute z-0 hidden h-28 w-60 rounded-t-xl bg-gray-600 opacity-40 group-hover:block"
        }
      />
      <div
        className={`${colorClasses[color]} flex h-28 w-full justify-end rounded-t-xl`}
      />
      <div
        className={"flex h-12 w-full items-center rounded-b-xl bg-gray-900 p-2"}
      >
        <span>{boardName}</span>
      </div>
    </div>
  );
}
