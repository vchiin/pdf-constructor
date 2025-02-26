import { RootBlock } from "@/components/pdf-constructor/shared/types/block.types";
import { BlockElement } from "../shared/types/element.types";
import {
  useBlock,
  useBlockChildren,
  useBlockTypedChild,
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
import { HeaderElement } from "./layout/header-element.component";
import { useConstructor } from "@/components/pdf-constructor/contexts/constructor/pdf-constructor.context";
import { cn } from "@/shared/utils/cn.util";
import { FooterElement } from "./layout/footer-element.component copy";
import { Block } from "../block.component";
import { RootToolbar } from "../toolbars/root-toolbar.component";

export const RootElement: BlockElement<RootBlock> = ({ block }) => {
  const { scale, showPreview } = useConstructor();
  const root = useBlock(block.id) as RootBlock;
  const children = useBlockChildren(root.id);
  const header = useBlockTypedChild(BlockTypeDefinitions.Header, root);
  const footer = useBlockTypedChild(BlockTypeDefinitions.Footer, root);

  return (
    <Block
      block={root}
      toolbar={<RootToolbar block={block} />}
      positions={[]}
      hideSelectionIndicators
    >
      {header && (
        <div className={cn("top-0 left-0 w-full", showPreview && "absolute")}>
          <HeaderElement block={header} />
        </div>
      )}

      <div
        style={{
          paddingLeft: `${root.marginLeft * scale}px`,
          paddingTop: `${root.marginTop * scale}px`,
          paddingRight: `${root.marginRight * scale}px`,
          paddingBottom: `${root.marginBottom * scale}px`,
        }}
      >
        <BlockList<
          typeof BlockTypeDefinitions.Root,
          | typeof BlockTypeDefinitions.Header
          | typeof BlockTypeDefinitions.Footer
        >
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
          hideDropzone={showPreview}
        />
      </div>

      {footer && (
        <div
          className={cn("bottom-0 left-0 w-full", showPreview && "absolute")}
        >
          <FooterElement block={footer} />
        </div>
      )}
    </Block>
  );
};
