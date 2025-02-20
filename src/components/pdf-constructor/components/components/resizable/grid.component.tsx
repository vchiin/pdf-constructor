import { Dispatch, ElementType, SetStateAction } from "react";
import { WidthResizable } from "./width-resizable.component";
import { cn } from "@/shared/utils/cn.util";
import { calculateWidths } from "./resizable.utils";

export type ItemsProps = Omit<
  React.ComponentProps<typeof WidthResizable>,
  "children"
>;

export type GridProps = {
  items: React.FC<ItemsProps>[];
  widths: number[];
  setWidths: Dispatch<SetStateAction<number[]>>;
  gap?: number;
  minWidth?: number;
  speed?: number;
  as?: ElementType;
  className?: string;
};

export const Grid: React.FC<GridProps> = ({
  items,
  gap,
  widths,
  setWidths,
  minWidth = 10,
  as: Component = "div",
  className,
}) => {
  const handleResize = (
    id: number,
    delta: number,
    cb: (prev: number, delta: number) => number
  ) => {
    setWidths((prev) =>
      calculateWidths({
        previousWidths: prev,
        delta,
        id,
        itemsAmount: items.length,
        calculateCallback: cb,
        minWidth,
      })
    );
  };

  return (
    <Component
      className={cn("flex w-full", className)}
      style={{ gap: `${gap ?? 0}px` }}
    >
      {items.map((Item, index) => (
        <Item
          id={index}
          key={index}
          width={widths[index] ?? minWidth}
          minWidth={minWidth}
          onResize={handleResize}
          hidden={index === items.length - 1}
        />
      ))}
    </Component>
  );
};
