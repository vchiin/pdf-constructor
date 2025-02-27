import { createPDF } from "@/libs/pdfmake";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";

import { ToolbarView } from "./components/toolbar-view.component";
import { prepareDocument } from "@/libs/conversion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/shared/utils/cn.util";
import { BlocksView } from "./components/blocks-view.component";
import { Slider } from "@/components/ui/slider";
import { usePreview } from "@/components/pdf-constructor/features/constructor/contexts/preview/pdf-preview.context";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { map, rootId, togglePreview, showPreview, scale, setScale } =
    useConstructor();
  const { selectedBlockId } = usePreview();

  return (
    <div
      className={cn(
        "@container flex w-auto flex-col gap-2 rounded border p-4 shadow",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="scale">{Math.floor(scale * 100) / 100}</label>
        <Slider
          value={[scale]}
          max={3}
          min={0.5}
          step={0.01}
          onValueChange={(value) => setScale(value[0])}
        />
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

export default Sidebar;
