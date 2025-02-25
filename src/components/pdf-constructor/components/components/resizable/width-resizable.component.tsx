import { ElementType, memo, useEffect, useRef, useState } from "react";
import { ScalingIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn.util";

type WidthResizableProps = {
  id: number;
  width: number; // percentage value
  children: React.ReactNode;
  maxWidth?: number;
  minWidth?: number;
  hidden?: boolean;
  onResize?: (
    id: number,
    deltaWidth: number,
    cb: (prevWidth: number, deltaWidth: number) => number
  ) => void;
  as?: ElementType;
  className?: string;
};

const getMinValue = (value: number, max: number | undefined) => {
  if (max !== undefined) {
    return Math.min(value, max);
  }
  return value;
};

const getMaxValue = (value: number, min: number | undefined) => {
  if (min !== undefined) {
    return Math.max(value, min);
  }
  return value;
};

export const WidthResizable: React.FC<WidthResizableProps> = memo(
  ({
    id,
    width,
    children,
    onResize,
    hidden,
    maxWidth = 100,
    minWidth,
    as: Component = "div",
    className,
  }) => {
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosX = useRef(0);

    const onMouseMove = (event: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerWidth =
        containerRef.current?.parentElement?.clientWidth || 1;
      const dx = event.clientX - lastPosX.current;
      const deltaPercentage = (dx / containerWidth) * 100;

      onResize?.(id, deltaPercentage, (prevWidth, deltaWidth) => {
        const newWidth = getMinValue(
          getMaxValue(prevWidth + deltaWidth, minWidth),
          maxWidth
        );
        return Math.round(newWidth * 100) / 100;
      });

      lastPosX.current = event.clientX;
    };

    const onMouseUp = () => {
      setIsResizing(false);
    };

    useEffect(() => {
      if (isResizing) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        return () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isResizing]);

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      setIsResizing(true);
      lastPosX.current = event.clientX;
      event.stopPropagation();
    };

    return (
      <Component
        ref={containerRef}
        className={cn(
          "relative max-w-full align-top *:first:h-full",
          className
        )}
        style={{ width: `${width}%` }}
      >
        {children}
        <div
          className={cn(
            "bg-primary text-primary-foreground absolute right-0 bottom-0 z-10 cursor-ew-resize rounded p-2",
            hidden && "hidden"
          )}
          onMouseDown={onMouseDown}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ScalingIcon />
        </div>
      </Component>
    );
  }
);
