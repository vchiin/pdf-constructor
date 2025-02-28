import {
  BlockElementProps,
  GenericBlockElementMap,
} from "./shared/types/element.types";
import { BlockDropzone } from "../../components/block-dropzone.component";
import { cn } from "@/shared/utils/cn.util";
import { CSSProperties } from "react";
import { Block } from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockType } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";

type ElementListProps<T extends BlockType, O extends BlockType = never> = {
  parent: Block;
  config: Block[];
  blocks: Omit<GenericBlockElementMap<T>, O>;
  direction?: "row" | "column";
  hideDropzone?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  smallDropzone?: boolean;
};

export const ElementList = <T extends BlockType, O extends BlockType = never>({
  config,
  blocks,
  direction = "column",
  hideDropzone = false,
  className,
  style,
  parent,
  smallDropzone,
}: ElementListProps<T, O>) => (
  <div
    className={cn(
      "flex h-full items-stretch",
      direction === "row" ? "flex-row" : "flex-col",
      className
    )}
    style={style}
  >
    {config.map((block) => {
      const Block = blocks[
        block.type as Extract<keyof typeof blocks, BlockType>
      ] as React.FC<BlockElementProps<typeof block>> | undefined;

      if (!Block) {
        return null;
      }

      return <Block key={block.id} block={block} />;
    })}

    {!hideDropzone && (
      <BlockDropzone
        className={cn(
          {
            "ml-1": direction === "row" && config.length > 0,
            "mt-1": direction === "column" && config.length > 0,
          },
          smallDropzone && "py-2"
        )}
        parentId={parent.id}
        type={parent.type}
      />
    )}
  </div>
);
