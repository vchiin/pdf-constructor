import { withBlock } from "../block.component";
import { ImageIcon } from "lucide-react";
import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";
import { useRef } from "react";

import { ImageBlock as ImageBlockType } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { WidthResizable } from "../../../components/resizable/width-resizable.component";

export const ImageBlock = withBlock<ImageBlockType>(({ block }) => {
  const [value, setValue] = useBlockUpdate(block);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedBlockId } = useConstructor();
  const isActive = selectedBlockId === block.id;

  if (value.content) {
    return (
      <WidthResizable
        id={0}
        width={value.width}
        onResize={(_, delta, calculate) => {
          setValue("width", (prev) => calculate(prev, delta));
        }}
        hidden={!isActive}
        minWidth={25}
      >
        <img
          src={value.content}
          alt={value.type}
          className="h-full w-full object-cover select-none"
        />
      </WidthResizable>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            setValue("content", base64);
          };

          reader.readAsDataURL(file);
        }}
      />

      <button
        className="flex h-full w-full cursor-pointer items-center justify-center p-2"
        type="button"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <ImageIcon />
      </button>
    </>
  );
});
