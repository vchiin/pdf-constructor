import { cn } from "@/shared/utils/cn.util";
import { Block } from "../../shared/types/block.types";
import { TreeBlockInformation } from "./tree-block-information.component";
import { CSSProperties, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon, GripIcon } from "lucide-react";
import { isContainerBlock } from "../../contexts/constructor/pdf-constructor-context.utils";
import { Edges } from "../blocks/base/content/edges.component";
import { useDraggable } from "../../hooks/use-dnd.hook";
import { getId } from "../../services/interactions/interactions.service";
import { CSS } from "@dnd-kit/utilities";
import { useScroller } from "../../contexts/scroller/scroller.context";
import { usePreview } from "../../contexts/preview/pdf-preview.context";

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
  const {
    selectBlock,
    selectedBlockId,
    appendProtectedElement,
    removeProtectedElement,
  } = usePreview();
  const { scrollTo, calculateOffset } = useScroller();
  const isActive = selectedBlockId === block.id;
  const ref = useRef<HTMLDivElement>(null);

  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
    id: getId(block.id, { type: "tree-item" }),
    data: {
      id: block.id,
      type: block.type,
      dragTargetType: "tree-item",
    },
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (isActive) {
      const offset = calculateOffset(element);
      scrollTo(offset);

      appendProtectedElement(element);
    } else {
      removeProtectedElement(element);
    }

    return () => {
      removeProtectedElement(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBlockId, block]);

  setNodeRef(ref.current);

  const style: CSSProperties = {
    transform: isDragging ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 50 : undefined,
    backgroundColor: isDragging ? "#fff" : undefined,
  };

  return (
    <div
      ref={ref}
      {...attributes}
      style={style}
      role="button"
      className={cn(
        "relative flex cursor-pointer gap-x-1 rounded border px-3 py-1",
        isActive && "bg-accent"
      )}
      onClick={() => selectBlock(block.id)}
    >
      <span
        ref={setActivatorNodeRef}
        {...listeners}
        className="text-xs font-bold"
      >
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

      <Edges
        data={{
          id: block.id,
          type: block.type,
        }}
        type="tree-item"
        positions={["bottom", "top"]}
        isParentDragged={isDragging}
      />
    </div>
  );
};
