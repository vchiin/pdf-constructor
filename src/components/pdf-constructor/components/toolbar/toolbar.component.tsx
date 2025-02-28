import { createPDF } from "@/libs/pdfmake";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";

import { ToolbarView } from "./components/toolbar-view.component";
import { prepareDocument } from "@/libs/conversion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/shared/utils/cn.util";
import { BlocksView } from "./components/blocks-view.component";

import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";
import { useControls } from "react-zoom-pan-pinch";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

type ToolbarProps = {
  className?: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  const { map, rootId, togglePreview, showPreview } = useConstructor();
  const { selectedBlockId } = usePreview();
  const props = useControls();

  return (
    <div
      className={cn(
        "@container flex w-auto flex-col gap-2 rounded border p-4 shadow",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <button
          className="hover:bg-accent hover:text-accent-foreground flex size-10 cursor-pointer items-center justify-center rounded transition-colors"
          onClick={() => props.zoomIn(0.3)}
        >
          <ZoomInIcon className="size-6" />
        </button>

        <button
          className="hover:bg-accent hover:text-accent-foreground flex size-10 cursor-pointer items-center justify-center rounded transition-colors"
          onClick={() => props.zoomOut(0.3)}
        >
          <ZoomOutIcon className="size-6" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="show-preview"
          checked={showPreview}
          onCheckedChange={togglePreview}
          className="cursor-pointer"
        />
        <label htmlFor="show-preview" className="cursor-pointer">
          Show preview
        </label>
      </div>

      <button
        onClick={() => {
          createPDF(prepareDocument(rootId, map));
        }}
        className="bg-primary text-primary-foreground cursor-pointer rounded p-2 text-lg"
      >
        Download PDF
      </button>

      {selectedBlockId === null && <BlocksView />}

      <ToolbarView
        className={cn("mt-4", selectedBlockId === null && "hidden")}
      />
    </div>
  );
};
