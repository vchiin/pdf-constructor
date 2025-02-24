import { Toolbar } from "./toolbar.component";
import { PageOrientationBlock } from "@/components/pdf-constructor/contexts/constructor/constructor.types";

import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";

import { BlockProps } from "../shared/types/block.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrientationValues = {
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait",
} as const satisfies Record<string, PageOrientationBlock["orientation"]>;

type PageOrientationBlockToolbarProps = BlockProps<PageOrientationBlock>;

export const PageOrientationBlockToolbar: React.FC<
  PageOrientationBlockToolbarProps
> = ({ block }) => {
  const [value, setValue] = useBlockUpdate(block);

  return (
    <Toolbar title="Page Orientation">
      <Select
        onValueChange={(value) =>
          setValue("orientation", value as PageOrientationBlock["orientation"])
        }
        value={value.orientation}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={OrientationValues.LANDSCAPE}>Landscape</SelectItem>
          <SelectItem value={OrientationValues.PORTRAIT}>Portrait</SelectItem>
        </SelectContent>
      </Select>
    </Toolbar>
  );
};
