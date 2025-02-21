import { BlockProps, BaseBlockProps } from "./shared/types/block.type";
import { BlockDropzone } from "../../components/block-dropzone.component";
import { cn } from "@/shared/utils/cn.util";
import { CSSProperties } from "react";
import { Block } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { GeneralBlockType } from "@/components/pdf-constructor/shared/constants/types-definition.constant";

type BlockListProps = {
  parent: Block;
  config: Block[];
  blocks: Partial<Record<GeneralBlockType, React.FC<BaseBlockProps<Block>>>>;
  direction?: "row" | "column";
  hideDropzone?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
};

export const BlockList: React.FC<BlockListProps> = ({
  config,
  blocks,
  direction = "column",
  hideDropzone = false,
  className,
  style,
  parent,
}) => (
  <div
    className={cn(
      "flex h-full items-stretch",
      direction === "row" ? "flex-row" : "flex-col",
      className
    )}
    style={style}
  >
    {config.map((block) => {
      const Block = blocks[block.type] as React.FC<BlockProps<typeof block>>;

      if (!Block) {
        return null;
      }

      return <Block key={block.id} block={block} />;
    })}

    {!hideDropzone && (
      <BlockDropzone
        className={cn({
          "ml-1": direction === "row" && config.length > 0,
          "mt-1": direction === "column" && config.length > 0,
        })}
        parentId={parent.id}
        type={parent.type}
      />
    )}
  </div>
);
