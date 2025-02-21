import { BlockThumbnailList } from "../../blocks/thumbnails/block-thumbnail-list.component";
import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { TextBlockThumbnail } from "../../blocks/thumbnails/blocks/text-block-thumbnail.component";
import { LineBlockThumbnail } from "../../blocks/thumbnails/blocks/line-block-thumbnail.component";
import { ImageBlockThumbnail } from "../../blocks/thumbnails/blocks/image-block-thumbnail.component";
import { BlockColumnGroupThumbnail } from "../../blocks/thumbnails/blocks/column-group-block.component";
import { BlockColumnThumbnail } from "../../blocks/thumbnails/blocks/column-block.component";
import { BreakBlockThumbnail } from "../../blocks/thumbnails/blocks/break-block-thumbnail.component";
import { TableBlockThumbnail } from "../../blocks/thumbnails/blocks/table/table-block-thumbnail.component";
import { TableRowBlockThumbnail } from "../../blocks/thumbnails/blocks/table/table-row-block-thumbnail.component";
import { TableCellBlockThumbnail } from "../../blocks/thumbnails/blocks/table/table-cell-block-thumbnail.component";
import { TemplateList } from "../../blocks/templates/template-lsit.component";

export const BlocksView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
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
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Groups</h3>

        <TemplateList />
      </div>
    </div>
  );
};
