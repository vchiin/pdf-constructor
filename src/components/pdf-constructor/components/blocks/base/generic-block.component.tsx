import {
  BlockType,
  BlockTypeDefinitions,
} from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { BlockProps } from "./shared/types/block.type";
import { Block } from "@/components/pdf-constructor/contexts/constructor/constructor.types";
import { TextBlock } from "./blocks/text-block.component";
import { LineBlock } from "./blocks/line-block.component";
import { ImageBlock } from "./blocks/image-block.component";
import { ColumnGroupBlock } from "./blocks/column-group-block.component";
import { BreakBlock } from "./blocks/break-block.component";
import { TableBlock } from "./blocks/table/table-block.component";
import { TableRowBlock } from "./blocks/table/table-row-block.component";
import { ColumnBlock } from "./blocks/column-block.component";
import { TableCellBlock } from "./blocks/table/table-cell.component";

type BlockFC = React.FC<BlockProps<Block>>;

const BlockList: Record<Exclude<BlockType, "root">, BlockFC> = {
  [BlockTypeDefinitions.Text]: TextBlock as BlockFC,
  [BlockTypeDefinitions.Line]: LineBlock as BlockFC,
  [BlockTypeDefinitions.Image]: ImageBlock as BlockFC,
  [BlockTypeDefinitions.ColumnGroup]: ColumnGroupBlock as BlockFC,
  [BlockTypeDefinitions.Break]: BreakBlock as BlockFC,
  [BlockTypeDefinitions.Table]: TableBlock as BlockFC,
  [BlockTypeDefinitions.Column]: ColumnBlock as BlockFC,
  [BlockTypeDefinitions.TableRow]: TableRowBlock as BlockFC,
  [BlockTypeDefinitions.TableCell]: TableCellBlock as BlockFC,
};

type GenericBlockProps = {
  block: Block;
};

export const GenericBlock = ({ block }: GenericBlockProps) => {
  if (block.type === "root") {
    return null;
  }

  const Block = BlockList[block.type];

  if (!Block) {
    return null;
  }

  return null;
  // return <Block block={block} />;
};
