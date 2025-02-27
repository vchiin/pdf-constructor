import { cn } from "@/shared/utils/cn.util";
import { Block } from "../../shared/types/block.types";
import { TreeBlockInformation } from "./tree-block-information.component";
import { useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon, GripIcon } from "lucide-react";
import { isContainerBlock } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.utils";
import { Edges } from "../blocks/base/content/edges.component";
import { useScroller } from "@/components/pdf-constructor/features/constructor/contexts/scroller/scroller.context";
import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";
import { useDragElement } from "../../features/dnd/hooks/use-drag-element.hook";
import { createPortal } from "react-dom";

type TreeBlockProps = {
  block: Block;
  isCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
};

export const TreeBlock = ({
  block,
  isCollapsed,
  onCollapseChange,
}: TreeBlockProps) => {
  const { selectBlock, selectedBlockId } = usePreview();
  const { scrollTo, calculateOffset } = useScroller();
  const isActive = selectedBlockId === block.id;

  const [ref, { dragHandleRef, dragging }] = useDragElement<
    HTMLDivElement,
    HTMLSpanElement
  >({
    targetType: "leaf",
    elementId: block.id,
    elementType: block.type,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || !isActive) {
      return;
    }

    const offset = calculateOffset(element);
    scrollTo(offset);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockId, block]);

  return (
    <div
      ref={ref}
      role="button"
      className={cn(
        "relative flex cursor-pointer gap-x-1 rounded border px-3 py-1",
        isActive && "bg-accent"
      )}
      onClick={() => selectBlock(block.id)}
    >
      <span ref={dragHandleRef} className="text-xs font-bold">
        <GripIcon className="h-4 w-4" />
      </span>
      <span className="text-xs font-bold">{block.id}</span>
      <span className="text-xs font-bold uppercase">{block.type}</span>
      <TreeBlockInformation block={block} />

      {isContainerBlock(block) && (
        <button
          className="ml-auto cursor-pointer"
          onClick={(e) => {
            onCollapseChange?.(!isCollapsed);
            e.stopPropagation();
          }}
        >
          {isCollapsed ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronUpIcon className="h-4 w-4" />
          )}
        </button>
      )}

      {dragging.type === "over" && (
        <Edges
          data={{
            elementId: block.id,
            elementType: block.type,
            areaSubtype: "leaf",
          }}
          positions={["bottom", "top"]}
        />
      )}

      {dragging.type === "preview" &&
        dragging.container !== null &&
        createPortal(
          <div className="flex gap-x-1 rounded border px-3 py-1">
            <span className="text-xs font-bold">{block.id}</span>
            <span className="text-xs font-bold uppercase">{block.type}</span>
          </div>,
          dragging.container
        )}
    </div>
  );
};
