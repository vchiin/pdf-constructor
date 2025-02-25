import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";
import { useEffect, useRef } from "react";
import { TextBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { BlockElementProps } from "../shared/types/element.types";
import { Block } from "../block.component";
import { TextBlockToolbar } from "../toolbars/text-block-toolbar.component";

export const TextElement: React.FC<BlockElementProps<TextBlock>> = ({
  block,
}) => {
  const [value, setValue] = useBlockUpdate(block);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.textContent = value.content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Block block={block} toolbar={<TextBlockToolbar block={block} />}>
      <div
        ref={divRef}
        contentEditable="plaintext-only"
        onInput={(event) => {
          setValue("content", event.currentTarget.textContent ?? "");
        }}
        className="w-full border-none bg-transparent outline-none focus:outline-none"
        style={{
          color: value.color,
          fontWeight: value.bold ? "bold" : "normal",
          fontStyle: value.italic ? "italic" : "normal",
          textDecoration: value.underline ? "underline" : "none",
          fontSize: `${value.fontSize}px`,
          fontFamily: value.fontFamily,
        }}
      ></div>
    </Block>
  );
};
