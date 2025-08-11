import { CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 sm:font-[family-name:var(--font-geist-sans)]"
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      <CircularProgress size="5rem" thickness={1.5} />
      <span className={"text-xl"}>Just a moment . . .</span>
    </div>
  );
}
