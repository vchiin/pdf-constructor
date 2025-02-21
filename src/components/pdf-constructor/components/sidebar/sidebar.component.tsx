import { createPDF } from "@/libs/pdfmake";
import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";

import { ToolbarView } from "./components/toolbar-view.component";
import { prepareDocument } from "@/libs/conversion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/shared/utils/cn.util";
import { BlocksView } from "./components/blocks-view.component";

const Sidebar = () => {
  const { map, rootId, selectedBlockId, togglePreview, showPreview } =
    useConstructor();

  return (
    <div className="@container flex flex-col gap-2 rounded border p-4 shadow">
      {selectedBlockId === null && <BlocksView />}

      <ToolbarView
        className={cn("mt-4", selectedBlockId === null && "hidden")}
      />

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
          // const previewWidth = containerRef.current?.offsetWidth ?? 0;
          console.log(map);
          createPDF(prepareDocument(rootId, map));
        }}
        className="bg-primary text-primary-foreground cursor-pointer rounded p-2 text-lg"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Sidebar;
