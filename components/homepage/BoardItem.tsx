interface Props {
  boardName: string;
  color: "green" | "red" | "blue" | "yellow";
}

export default function BoardItem({ boardName, color }: Props) {
  return (
    <div className="flex flex-col w-60 h-40">
      <div
        className={`bg-${color}-200 justify-end rounded-t-xl flex w-full h-28`}
      />
      <div
        className={"w-full h-12 bg-gray-900 flex items-center p-2 rounded-b-xl"}
      >
        <span>{boardName}</span>
      </div>
    </div>
  );
}
