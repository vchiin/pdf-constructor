import { TrashIcon } from "lucide-react";

import { GripIcon } from "lucide-react";
import { Block } from "@/components/pdf-constructor/features/core/types/block.types";

import { ElementType, RefCallback, RefObject } from "react";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";
import { createPortal } from "react-dom";

type ElementToolsProps = {
  block: Block;
  dragRef?: RefCallback<HTMLButtonElement> | RefObject<HTMLButtonElement>;
  isDragging: boolean;
  toolbar?: React.ReactNode;
  as?: ElementType;
  hideSelectionIndicators?: boolean;
  draggable?: boolean;
  deletable?: boolean;
};

export const ElementTools = ({
  block,
  dragRef,
  isDragging,
  toolbar,
  as: Component = "div",
  hideSelectionIndicators,
  draggable = true,
  deletable = true,
}: ElementToolsProps) => {
  const { deleteBlock } = useConstructor();
  const { deselectBlock, selectedBlockId, containerRef } = usePreview();

  const isActive = selectedBlockId === block.id;

  if (!isActive) {
    return null;
  }

  return (
    <Component>
      {!hideSelectionIndicators && draggable && (
        <button
          className="bg-primary text-primary-foreground absolute top-0 left-0 flex size-6 cursor-pointer items-center justify-center rounded"
          ref={dragRef}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <GripIcon className="size-4" />
        </button>
      )}

      {!isDragging && !hideSelectionIndicators && deletable && (
        <button
          className="bg-primary text-primary-foreground absolute top-0 right-0 flex size-6 cursor-pointer items-center justify-center rounded"
          onClick={(event) => {
            deleteBlock(block.id);
            deselectBlock();
            event.stopPropagation();
          }}
        >
          <TrashIcon className="size-4" />
        </button>
      )}

      {containerRef.current && createPortal(toolbar, containerRef.current)}
    </Component>
  );
};
