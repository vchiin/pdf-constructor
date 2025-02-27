import { createPortal } from "react-dom";
import { BaseBlockElementProps } from "./shared/types/element.types";
import { Block as BlockType } from "@/components/pdf-constructor/shared/types/block.types";
import { BlockContent } from "./content/block-content.component";
import { BlockTools } from "./content/block-tools.component";
import { Edges } from "./content/edges.component";
import { useDragElement } from "@/components/pdf-constructor/features/dnd/hooks/use-drag-element.hook";

export const Block = <T extends BlockType>({
  children,
  toolbar,
  block,
  positions = ["top", "bottom"],
  as = "div",
  className,
  hideSelectionIndicators,
  draggable = true,
  deletable,
  style,
}: BaseBlockElementProps<T>) => {
  const [ref, { dragging, dragHandleRef }] = useDragElement<
    HTMLDivElement,
    HTMLButtonElement
  >({
    targetType: "block",
    elementId: block.id,
    elementType: block.type,
  });

  const toolsAs = as === "tr" ? "td" : "div";

  const tools = (
    <>
      <BlockTools
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
    <BlockContent
      block={block}
      ref={ref}
      isOver={false}
      as={as}
      className={className}
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
    </BlockContent>
  );
};
