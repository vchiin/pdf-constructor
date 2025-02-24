import {
  BlockType,
  BlockTypeDefinitions,
} from "@/components/pdf-constructor/shared/constants/types-definition.constant";

import { TextBlockThumbnail } from "./blocks/text-block-thumbnail.component";
import { LineBlockThumbnail } from "./blocks/line-block-thumbnail.component";
import { ImageBlockThumbnail } from "./blocks/image-block-thumbnail.component";
import { BreakBlockThumbnail } from "./blocks/break-block-thumbnail.component";
import { TableBlockThumbnail } from "./blocks/table/table-block-thumbnail.component";
import { TableRowBlockThumbnail } from "./blocks/table/table-row-block-thumbnail.component";
import { TableCellBlockThumbnail } from "./blocks/table/table-cell-block-thumbnail.component";
import { BlockColumnGroupThumbnail } from "./blocks/column-group-block.component";
import { BlockColumnThumbnail } from "./blocks/column-block.component";
import { PageOrientationBlockThumbnail } from "./blocks/page-orientation-thumbnail.component";

const ThumbnailList: Record<Exclude<BlockType, "root">, React.FC> = {
  [BlockTypeDefinitions.Text]: TextBlockThumbnail,
  [BlockTypeDefinitions.Line]: LineBlockThumbnail,
  [BlockTypeDefinitions.Image]: ImageBlockThumbnail,
  [BlockTypeDefinitions.ColumnGroup]: BlockColumnGroupThumbnail,
  [BlockTypeDefinitions.Break]: BreakBlockThumbnail,
  [BlockTypeDefinitions.Table]: TableBlockThumbnail,
  [BlockTypeDefinitions.Column]: BlockColumnThumbnail,
  [BlockTypeDefinitions.TableRow]: TableRowBlockThumbnail,
  [BlockTypeDefinitions.TableCell]: TableCellBlockThumbnail,
  [BlockTypeDefinitions.PageOrientation]: PageOrientationBlockThumbnail,
};

type GenericThumbnailProps = {
  type: BlockType;
};

export const GenericThumbnail: React.FC<GenericThumbnailProps> = ({ type }) => {
  if (type === "root") {
    return null;
  }

  const Thumbnail = ThumbnailList[type];

  if (!Thumbnail) {
    return null;
  }

  return <Thumbnail />;
};
