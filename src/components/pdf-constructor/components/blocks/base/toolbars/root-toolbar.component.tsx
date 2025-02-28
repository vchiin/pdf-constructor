import { Toolbar } from "./toolbar.component";
import { RootBlock } from "@/components/pdf-constructor/features/core/types/block.types";

import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";

import { BlockElementProps } from "../shared/types/element.types";

import { MarginInput } from "./components/margin-input.component";

type RootToolbarProps = BlockElementProps<RootBlock>;

export const RootToolbar: React.FC<RootToolbarProps> = ({ block }) => {
  const [value, setValue] = useBlockUpdate(block);

  return (
    <Toolbar title="Root">
      <MarginInput
        value={{
          top: value.marginTop,
          right: value.marginRight,
          bottom: value.marginBottom,
          left: value.marginLeft,
        }}
        onChange={(key, value) => {
          if (key === "top") {
            setValue("marginTop", value);
          }
          if (key === "left") {
            setValue("marginLeft", value);
          }
          if (key === "bottom") {
            setValue("marginBottom", value);
          }
          if (key === "right") {
            setValue("marginRight", value);
          }
        }}
      />
    </Toolbar>
  );
};
