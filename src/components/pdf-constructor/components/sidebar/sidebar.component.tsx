import { createPDF } from "@/libs/pdfmake";
import { useConstructor } from "../../contexts/constructor/pdf-constructor.context";

import { BlockThumbnailList } from "../blocks/thumbnails/block-thumbnail-list.component";
import { BlockColumnThumbnail } from "../blocks/thumbnails/blocks/column-block.component";
import { BlockColumnGroupThumbnail } from "../blocks/thumbnails/blocks/column-group-block.component";
import { ImageBlockThumbnail } from "../blocks/thumbnails/blocks/image-block-thumbnail.component";
import { LineBlockThumbnail } from "../blocks/thumbnails/blocks/line-block-thumbnail.component";
import { TextBlockThumbnail } from "../blocks/thumbnails/blocks/text-block-thumbnail.component";
import { ToolbarView } from "./components/toolbar-view.component";
import { prepareDocument } from "@/libs/conversion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/shared/utils/cn.util";
import { BreakBlockThumbnail } from "../blocks/thumbnails/blocks/break-block-thumbnail.component";
import { BlockTypeDefinitions } from "../../shared/constants/types-definition.constant";
import { TableBlockThumbnail } from "../blocks/thumbnails/blocks/table/table-block-thumbnail.component";
import { TableRowBlockThumbnail } from "../blocks/thumbnails/blocks/table/table-row-block-thumbnail.component";
import { TableCellBlockThumbnail } from "../blocks/thumbnails/blocks/table/table-cell-block-thumbnail.component";

const Sidebar = () => {
  const { map, rootId, selectedBlockId, togglePreview, showPreview } =
    useConstructor();

  return (
    <div className="@container flex flex-col gap-2 rounded border p-4 shadow">
      {selectedBlockId === null && (
        <>
          <h3 className="text-lg font-bold">Blocks</h3>
          <BlockThumbnailList
            blocks={{
              [BlockTypeDefinitions.Text]: TextBlockThumbnail,
              [BlockTypeDefinitions.Line]: LineBlockThumbnail,
              [BlockTypeDefinitions.Image]: ImageBlockThumbnail,
              [BlockTypeDefinitions.ColumnGroup]: BlockColumnGroupThumbnail,
              [BlockTypeDefinitions.Column]: BlockColumnThumbnail,
              [BlockTypeDefinitions.Break]: BreakBlockThumbnail,
              [BlockTypeDefinitions.Table]: TableBlockThumbnail,
              [BlockTypeDefinitions.TableRow]: TableRowBlockThumbnail,
              [BlockTypeDefinitions.TableCell]: TableCellBlockThumbnail,
            }}
          />
        </>
      )}

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
