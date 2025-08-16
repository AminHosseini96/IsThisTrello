import { cn } from "@/utils";
import { JSX } from "react";

interface Props {
  label?: string;
  action?: () => void;
  size?: "sm" | "md" | "lg";
  rounded?: "lg" | "full";
  color?: "primary" | "accent" | "error";
  outlined?: boolean;
  wide?: boolean;
  disabled?: boolean;
  loadingSpinner?: boolean;
  icon?: JSX.Element;
  shape?: "circle" | "square" | "none";
}

export default function AppButton({
  label,
  action,
  size = "md",
  rounded = "lg",
  icon = undefined,
  loadingSpinner = false,
  wide = false,
  outlined = false,
  disabled = false,
  color = "primary",
  shape = "none",
}: Props) {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={cn(
        "btn hover:text-white",
        size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md",
        rounded === "full" ? "rounded-full" : "rounded-lg",
        wide ? "btn-wide" : "",
        outlined ? "btn-outline" : "btn-soft",
        shape === "square"
          ? "btn-square"
          : shape === "circle"
            ? "btn-circle"
            : "",
        color === "primary"
          ? "btn-primary"
          : color === "accent"
            ? "btn-accent"
            : "btn-error",
      )}
    >
      {loadingSpinner && <span className="loading loading-spinner"></span>}
      {icon && icon}
      {label}
    </button>
  );
}
