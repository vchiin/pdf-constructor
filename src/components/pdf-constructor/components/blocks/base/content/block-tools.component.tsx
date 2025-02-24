import { TrashIcon } from "lucide-react";

import { GripIcon } from "lucide-react";
import { Block } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ElementType, RefCallback } from "react";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { usePreview } from "@/components/pdf-constructor/contexts/preview/pdf-preview.context";
import { createPortal } from "react-dom";

type BlockToolsProps = {
  block: Block;
  isDragging: boolean;
  setActivatorNodeRef: RefCallback<HTMLElement | null>;
  listeners?: SyntheticListenerMap;
  toolbar?: React.ReactNode;
  as?: ElementType;
};

export const BlockTools = ({
  block,
  isDragging,
  setActivatorNodeRef,
  listeners,
  toolbar,
  as: Component = "div",
}: BlockToolsProps) => {
  const { deleteBlock } = useConstructor();
  const { deselectBlock, selectedBlockId } = usePreview();
  const { containerRef } = usePreview();

  const isActive = selectedBlockId === block.id;

  if (!isActive) {
    return null;
  }

  return (
    <Component>
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        className="bg-primary text-primary-foreground absolute top-0 left-0 cursor-pointer rounded p-2"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <GripIcon />
      </button>

      {!isDragging && (
        <button
          className="bg-primary text-primary-foreground absolute top-0 right-0 cursor-pointer rounded p-2"
          onClick={(event) => {
            deleteBlock(block.id);
            deselectBlock();
            event.stopPropagation();
          }}
        >
          <TrashIcon />
        </button>
      )}

      {containerRef.current && createPortal(toolbar, containerRef.current)}
    </Component>
  );
};
