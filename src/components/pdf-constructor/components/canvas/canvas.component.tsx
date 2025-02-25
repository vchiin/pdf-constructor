import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";
import { useBlock } from "../../contexts/constructor/pdf-constructor-context.hooks";
import { RootBlock } from "../../shared/types/block.types";
import { PAGE_WIDTH_PT } from "@/libs/pdfmake";
import { convertPtToPx } from "@/shared/utils/units.utils";

import { useEffect, useRef } from "react";
import { ScrollerProvider } from "../../contexts/scroller/scroller.context";
import { RootElement } from "../blocks/base/block-elements/root-element.component";

type CanvasProps = {
  className?: string;
};

export const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { rootId, containerRef, scale, setScale } = useConstructor();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const block = useBlock(rootId) as RootBlock;

  useEffect(() => {
    const parentWidth = containerRef.current?.parentElement?.clientWidth;

    if (parentWidth) {
      setScale(parentWidth / convertPtToPx(PAGE_WIDTH_PT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      <div
        ref={containerRef}
        className="overflow-x-scroll rounded border p-4 shadow"
        style={{
          width: `${convertPtToPx(PAGE_WIDTH_PT) * scale}px`,
        }}
      >
        <ScrollerProvider containerRef={wrapperRef}>
          <RootElement block={block} />
        </ScrollerProvider>
      </div>
    </div>
  );
};
