import { useBlock } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { ScrollerProvider } from "@/components/pdf-constructor/features/constructor/contexts/scroller/scroller.context";
import { RootBlock } from "@/components/pdf-constructor/features/core/types/block.types";
import { PAGE_HEIGHT_PT } from "@/libs/pdfmake";
import { cn } from "@/shared/utils/cn.util";
import { useEffect, useRef } from "react";
import { RootElement } from "../../blocks/base/block-elements/root-element.component";
import { useTransformContext } from "react-zoom-pan-pinch";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { convertPtToPx } from "@/shared/utils/units.utils";

type InnerCanvasProps = {
  className?: string;
};

const getTransformableWrapper = (element: HTMLElement | null) => {
  return element?.parentElement?.parentElement;
};

export const InnerCanvas: React.FC<InnerCanvasProps> = ({ className }) => {
  const { rootId, containerRef } = useConstructor();
  const { transformState, setTransformState } = useTransformContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const block = useBlock(rootId) as RootBlock;

  // Function to handle auto-scrolling manually
  const handleDragOver = (clientX: number, clientY: number) => {
    const wrapper = getTransformableWrapper(wrapperRef.current);

    if (!wrapper) {
      return;
    }

    const boundingRect = wrapper.getBoundingClientRect();

    const SCROLL_SPEED = 3; // Speed of auto-scrolling
    const SCROLL_ZONE = 50; // Pixels from the edge where scrolling starts

    if (clientY < boundingRect.top + SCROLL_ZONE) {
      // Scroll up

      setTransformState(
        transformState.scale,
        transformState.positionX,
        transformState.positionY + SCROLL_SPEED
      );
      // wrapper.scrollBy({ top: -SCROLL_SPEED, behavior: "smooth" });
    } else if (clientY > boundingRect.bottom - SCROLL_ZONE) {
      // Scroll down
      setTransformState(
        transformState.scale,
        transformState.positionX,
        transformState.positionY - SCROLL_SPEED
      );
      // wrapper.scrollBy({ top: SCROLL_SPEED, behavior: "smooth" });
    }

    if (clientX < boundingRect.left + SCROLL_ZONE) {
      // Scroll left
      setTransformState(
        transformState.scale,
        transformState.positionX + SCROLL_SPEED,
        transformState.positionY
      );
    } else if (clientX > boundingRect.right - SCROLL_ZONE) {
      setTransformState(
        transformState.scale,
        transformState.positionX - SCROLL_SPEED,
        transformState.positionY
      );
    }
  };

  useEffect(() => {
    return monitorForElements({
      onDrag: (props) => {
        const input = props.location.current.input;
        handleDragOver(input.clientX, input.clientY);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative h-full w-full", className)}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto h-full overflow-visible rounded border shadow"
        style={{
          width: `${convertPtToPx(PAGE_HEIGHT_PT)}px`,
        }}
      >
        <ScrollerProvider containerRef={wrapperRef}>
          <RootElement block={block} />
        </ScrollerProvider>
      </div>
    </div>
  );
};
