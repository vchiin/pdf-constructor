import { Block as BlockType } from "@/components/pdf-constructor/shared/types/block.types";
import { BaseBlockElementProps } from "../shared/types/element.types";
import {
  CSSProperties,
  ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { DraggableAttributes } from "@dnd-kit/core";

import { cn } from "@/shared/utils/cn.util";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { useScroller } from "@/components/pdf-constructor/contexts/scroller/scroller.context";
import { usePreview } from "@/components/pdf-constructor/contexts/preview/pdf-preview.context";

type BlockContentProps = Omit<
  BaseBlockElementProps<BlockType>,
  "toolbar" | "positions"
> & {
  children?: React.ReactNode;
  attributes?: DraggableAttributes;
  style?: CSSProperties;
  isDragging: boolean;
  isOver: boolean;
  as: ElementType;
  className?: string;
  hideSelectionIndicators?: boolean;
};

export const BlockContent = forwardRef<HTMLElement, BlockContentProps>(
  (
    {
      children,
      block,
      attributes,
      isDragging,
      style,
      isOver,
      as: Component,
      className,
      hideSelectionIndicators,
    },
    ref
  ) => {
    const { showPreview } = useConstructor();
    const { selectBlock, selectedBlockId } = usePreview();

    const isActive = selectedBlockId === block.id;

    const componentRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(ref, () => componentRef.current!);

    const { scrollTo, calculateOffset } = useScroller();

    useEffect(() => {
      if (isActive && componentRef.current) {
        const offset = calculateOffset(componentRef.current);
        scrollTo(offset);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBlockId, block]);

    return (
      <Component
        {...attributes}
        ref={componentRef}
        style={style}
        className={cn(
          "group [&:not(:has(.child:hover))]:hover:bg-accent child data-[selected=true]:outline-primary relative w-full rounded transition-[color,background-color,opacity] data-[selected=true]:z-10 data-[selected=true]:outline-2",
          isDragging && "opacity-50",
          !showPreview && "border p-1",
          className
        )}
        onClick={(event: MouseEvent) => {
          selectBlock(block.id);
          event.stopPropagation();
        }}
        data-selected={isActive && !hideSelectionIndicators}
        role="button"
      >
        {children}
        {isOver && <div className="absolute inset-0 bg-green-500/50" />}
      </Component>
    );
  }
);
