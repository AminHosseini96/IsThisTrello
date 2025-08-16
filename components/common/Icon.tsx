import { iconContainerStyles, iconStyles } from "@/styles/icon";
import { cn } from "@/utils";
import type { ComponentType, SVGProps } from "react";

interface IconProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  action?: () => void;
  color?: "white" | "slate" | "sky";
  size?: "sm" | "md" | "lg";
  iconStyle?: string;
  containerStyle?: string;
  containerHoverColor?: "slate" | "sky" | "none";
  cursor?: "pointer" | "none";
  containerSize?: "sm" | "md" | "lg";
  rounded?: "full" | "lg";
}

export default function Icon({
  icon: IconEl,
  color,
  size,
  iconStyle,
  containerSize,
  containerStyle,
  containerHoverColor,
  rounded,
  cursor,
  action,
}: IconProps) {
  return (
    <div
      onClick={() => (action ? action() : undefined)}
      className={cn(
        iconContainerStyles({
          size: containerSize,
          hoverColor: containerHoverColor,
          rounded: rounded,
          cursor: cursor,
        }),
        containerStyle,
      )}
    >
      <IconEl className={cn(iconStyles({ color, size }), iconStyle)} />
    </div>
  );
}
