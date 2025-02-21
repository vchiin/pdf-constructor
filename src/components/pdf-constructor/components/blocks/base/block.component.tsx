import { BaseBlockProps } from "./shared/types/block.type";
import { Block as BlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { CSS } from "@dnd-kit/utilities";
import { BlockContent } from "./content/block-content.component";
import { BlockTools } from "./content/block-tools.component";
import { CSSProperties } from "react";
import { Edges } from "./content/edges.component";
import { useDraggable } from "@/components/pdf-constructor/hooks/use-dnd.hook";
import { getId } from "@/components/pdf-constructor/services/interactions/interactions.service";

export const Block = <T extends BlockType>({
  children,
  toolbar,
  block,
  positions = ["top", "bottom"],
  as = "div",
  className,
}: BaseBlockProps<T>) => {
  const {
    setNodeRef,
    listeners,
    setActivatorNodeRef,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
    id: getId(block.id, { type: "block" }),
    data: {
      id: block.id,
      type: block.type,
      dragTargetType: "block",
    },
  });

  const style: CSSProperties = {
    transform: isDragging ? CSS.Translate.toString(transform) : undefined,
  };

  const toolsAs = as === "tr" ? "td" : "div";

  const tools = (
    <>
      <BlockTools
        block={block}
        isDragging={isDragging}
        setActivatorNodeRef={setActivatorNodeRef}
        listeners={listeners}
        toolbar={toolbar}
        as={toolsAs}
      />

      <Edges
        data={{
          id: block.id,
          type: block.type,
        }}
        positions={positions}
        as={toolsAs}
        type="block"
      />
    </>
  );

  return (
    <BlockContent
      block={block}
      style={style}
      ref={setNodeRef}
      isDragging={isDragging}
      attributes={attributes}
      isOver={false}
      as={as}
      className={className}
    >
      {children}
      {tools}
    </BlockContent>
  );
};
