import { RootBlock } from "@/components/pdf-constructor/features/core/types/block.types";
import { BlockElement } from "../shared/types/element.types";
import {
  useBlock,
  useBlockChildren,
  useBlockTypedChild,
} from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor-context.hooks";
import { ElementList } from "../element-list.component";

import { BlockTypeDefinitions } from "@/components/pdf-constructor/features/core/constants/types-definition.constant";

import { HeaderElement } from "./layout/header-element.component";
import { useConstructor } from "@/components/pdf-constructor/features/constructor/contexts/constructor/pdf-constructor.context";
import { cn } from "@/shared/utils/cn.util";
import { FooterElement } from "./layout/footer-element.component copy";
import { Element } from "../element.component";
import { RootToolbar } from "../toolbars/root-toolbar.component";

import { PageOrientationElement } from "./page-orientation-element.component";

export const RootElement: BlockElement<RootBlock> = ({ block }) => {
  const { showPreview } = useConstructor();
  const root = useBlock(block.id) as RootBlock;
  const children = useBlockChildren(root.id);
  const header = useBlockTypedChild(BlockTypeDefinitions.Header, root);
  const footer = useBlockTypedChild(BlockTypeDefinitions.Footer, root);

  return (
    <Element
      block={root}
      toolbar={<RootToolbar block={block} />}
      positions={[]}
      hideSelectionIndicators
      className="overflow-visible"
    >
      {header && (
        <div className={cn("top-0 left-0 w-full", showPreview && "absolute")}>
          <HeaderElement block={header} />
        </div>
      )}

      {/* absolute positioning and margins do not work correctly, so to avoid it we create an empty block between elements */}
      <div
        style={{
          height: root.marginTop,
          width: "100%",
        }}
      ></div>

      <div>
        <ElementList<
          typeof BlockTypeDefinitions.Root,
          | typeof BlockTypeDefinitions.Header
          | typeof BlockTypeDefinitions.Footer
        >
          config={children}
          parent={root}
          blocks={{
            [BlockTypeDefinitions.PageOrientation]: PageOrientationElement,
          }}
          style={{
            gap: showPreview ? `50px` : 0,
          }}
          hideDropzone
        />
      </div>

      {/* absolute positioning and margins do not work correctly, so to avoid it we create an empty block between elements */}
      <div
        style={{
          height: root.marginBottom,
          width: "100%",
        }}
      ></div>

      {footer && (
        <div
          className={cn("bottom-0 left-0 w-full", showPreview && "absolute")}
        >
          <FooterElement block={footer} />
        </div>
      )}
    </Element>
  );
};
