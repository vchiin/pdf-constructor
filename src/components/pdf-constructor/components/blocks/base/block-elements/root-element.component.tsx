import { RootBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { BlockElement } from "../shared/types/element.types";
import {
  useBlock,
  useBlockChildren,
} from "@/components/pdf-constructor/contexts/constructor/pdf-constructor-context.hooks";
import { BlockList } from "../block-list.component";

import { BlockTypeDefinitions } from "@/components/pdf-constructor/shared/constants/types-definition.constant";
import { BreakElement } from "./break-element.component";
import { ColumnGroupElement } from "./column-group-element.component";
import { ImageElement } from "./image-element.component";
import { LineElement } from "./line-element.component";
import { TableElement } from "./table/table-element.component";
import { TextElement } from "./text-element.component";
import { PageOrientationElement } from "./page-orientation-element.component";

export const RootElement: BlockElement<RootBlock> = ({ block }) => {
  const root = useBlock(block.id);
  const children = useBlockChildren(root.id);

  return (
    <BlockList<typeof BlockTypeDefinitions.Root>
      config={children}
      parent={root}
      blocks={{
        [BlockTypeDefinitions.Break]: BreakElement,
        [BlockTypeDefinitions.ColumnGroup]: ColumnGroupElement,
        [BlockTypeDefinitions.Image]: ImageElement,
        [BlockTypeDefinitions.Line]: LineElement,
        [BlockTypeDefinitions.Table]: TableElement,
        [BlockTypeDefinitions.Text]: TextElement,
        [BlockTypeDefinitions.PageOrientation]: PageOrientationElement,
      }}
    />
  );
};
