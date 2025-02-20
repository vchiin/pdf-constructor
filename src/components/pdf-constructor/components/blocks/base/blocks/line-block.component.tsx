import { withBlock } from "../block.component";
import { LineBlock as LineBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";

export const LineBlock = withBlock<LineBlockType>(({ block }) => {
  return (
    <div
      className="w-full"
      style={{
        height: block.height,
        backgroundColor: block.color,
      }}
    />
  );
});
