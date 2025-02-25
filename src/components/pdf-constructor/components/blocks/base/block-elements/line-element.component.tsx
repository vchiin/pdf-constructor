import { LineBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { BlockElementProps } from "../shared/types/element.types";
import { Block } from "../block.component";

export const LineElement: React.FC<BlockElementProps<LineBlock>> = ({
  block,
}) => {
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
