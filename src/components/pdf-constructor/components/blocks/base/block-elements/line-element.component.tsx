import { LineBlock } from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockElementProps } from "../shared/types/element.types";
import { Element } from "../element.component";

export const LineElement: React.FC<BlockElementProps<LineBlock>> = ({
  block,
}) => {
  return (
    <Element block={block}>
      <div
        className="w-full"
        style={{
          height: block.height,
          backgroundColor: block.color,
        }}
      />
    </Element>
  );
};
