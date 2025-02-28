import { createPortal } from "react-dom";
import { BaseBlockElementProps } from "./shared/types/element.types";
import { Block as BlockType } from "@/components/pdf-constructor/features/core/types/block.types";
import { ElementContent } from "./content/element-content.component";
import { ElementTools } from "./content/element-tools.component";
import { Edges } from "./content/edges.component";
import { useDragElement } from "@/components/pdf-constructor/features/dnd/hooks/use-drag-element.hook";
import { cn } from "@/shared/utils/cn.util";

import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";

export const Element = <T extends BlockType>({
  children,
  toolbar,
  block,
  as = "div",
  className,
  hideSelectionIndicators,
  draggable = true,
  deletable,
  style,
  positions = ["top", "bottom"],
}: BaseBlockElementProps<T>) => {
  const { selectedBlockId } = usePreview();
  const [ref, { dragging, dragHandleRef }] = useDragElement<
    HTMLDivElement,
    HTMLButtonElement
  >({
    targetType: "block",
    elementId: block.id,
    elementType: block.type,
  });

  const isActive = selectedBlockId === block.id;
  const toolsAs = as === "tr" ? "td" : "div";

  const tools = (
    <>
      <ElementTools
        block={block}
        dragRef={dragHandleRef}
        isDragging={false}
        toolbar={toolbar}
        as={toolsAs}
        hideSelectionIndicators={hideSelectionIndicators}
        draggable={draggable}
        deletable={deletable}
      />

      {dragging.type === "over" && (
        <Edges
          data={{
            elementId: block.id,
            elementType: block.type,
            areaSubtype: "block",
          }}
          positions={positions}
          as={toolsAs}
        />
      )}
    </>
  );

  return (
    <ElementContent
      block={block}
      ref={ref}
      isOver={false}
      as={as}
      className={cn(isActive && "panningDisabled", className)}
      hideSelectionIndicators={hideSelectionIndicators}
      style={style}
    >
      {children}
      {tools}

      {dragging.type === "preview" &&
        dragging.container !== null &&
        createPortal(
          <div className="rounded bg-white shadow">{children}</div>,
          dragging.container
        )}
    </ElementContent>
  );
};
