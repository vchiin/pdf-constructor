import { LineBlock as LineBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { BlockProps } from "../shared/types/block.type";
import { Block } from "../block.component";

export const LineBlock: React.FC<BlockProps<LineBlockType>> = ({ block }) => {
  return (
    <Block block={block}>
      <div
        className="w-full"
        style={{
          height: block.height,
          backgroundColor: block.color,
        }}
      />
    </Block>
  );
};
