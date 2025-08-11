import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = object;

const menuItemStyle = tv({
  base: "w-fit rounded-md bg-gray-600 p-2 z-40 hover:bg-gray-700 cursor-pointer",
});

const CardItemMenu = forwardRef<HTMLDivElement, Props>(({}: Props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-0 left-90 z-50 flex w-48 flex-col gap-2 rounded-xl"
    >
      <button className={menuItemStyle()}>Open card</button>
      <button className={menuItemStyle()}>Edit labels</button>
      <button className={menuItemStyle()}>Change members</button>
      <button className={menuItemStyle()}>Change cover</button>
      <button className={menuItemStyle()}>Edit dates</button>
      <button className={menuItemStyle()}>Move</button>
      <button className={menuItemStyle()}>Copy card</button>
      <button className={menuItemStyle()}>Copy link</button>
    </div>
  );
});

CardItemMenu.displayName = "CardItemMenu";
export default CardItemMenu;
