import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { usePreview } from "@/components/pdf-constructor/contexts/preview/pdf-preview.context";
import { cn } from "@/shared/utils/cn.util";
import { XIcon } from "lucide-react";

type ToolbarViewProps = {
  className?: string;
};

export const ToolbarView = ({ className }: ToolbarViewProps) => {
  const { deselectBlock } = useConstructor();
  const { containerRef } = usePreview();

  return (
    <>
      <div className={cn("flex items-center justify-between", className)}>
        <h3 className="text-lg font-bold">Properties</h3>
        <button
          className="hover:bg-accent cursor-pointer rounded p-2 transition-colors"
          type="button"
          onClick={() => deselectBlock()}
        >
          <XIcon className="size-4" />
        </button>
      </div>
      <div ref={containerRef} />
    </>
  );
};
