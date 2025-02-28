import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";
import { memo, useEffect, useRef } from "react";
import { TextBlock } from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockElementProps } from "../shared/types/element.types";
import { Element } from "../element.component";
import { TextBlockToolbar } from "../toolbars/text-block-toolbar.component";

const TextContent: React.FC<BlockElementProps<TextBlock>> = memo(
  ({ block }) => {
    const [value, setValue] = useBlockUpdate(block);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (divRef.current) {
        divRef.current.textContent = value.content;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
    );
  }
);

export const TextElement: React.FC<BlockElementProps<TextBlock>> = ({
  block,
}) => {
  return (
    <Element block={block} toolbar={<TextBlockToolbar block={block} />}>
      <TextContent block={block} />
    </Element>
  );
};
