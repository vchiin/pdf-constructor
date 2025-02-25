import { Toolbar } from "./toolbar.component";
import { PageOrientationBlock } from "@/components/pdf-constructor/shared/types/block.types";

import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";

import { BlockElementProps } from "../shared/types/element.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreview } from "@/components/pdf-constructor/contexts/preview/pdf-preview.context";
import { useEffect, useRef, useState } from "react";

const OrientationValues = {
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait",
} as const satisfies Record<string, PageOrientationBlock["orientation"]>;

type PageOrientationBlockToolbarProps = BlockElementProps<PageOrientationBlock>;

export const PageOrientationBlockToolbar: React.FC<
  PageOrientationBlockToolbarProps
> = ({ block }) => {
  const [value, setValue] = useBlockUpdate(block);
  const [show, setShow] = useState(false);
  const { appendProtectedElement, removeProtectedElement, selectedBlockId } =
    usePreview();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    appendProtectedElement(element);

    return () => removeProtectedElement(element);
  }, [selectedBlockId, show]);

  return (
    <Toolbar title="Page Orientation">
      <Select
        onValueChange={(value) =>
          setValue("orientation", value as PageOrientationBlock["orientation"])
        }
        value={value.orientation}
        open={show}
        onOpenChange={setShow}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent ref={ref}>
          <SelectItem value={OrientationValues.LANDSCAPE}>Landscape</SelectItem>
          <SelectItem value={OrientationValues.PORTRAIT}>Portrait</SelectItem>
        </SelectContent>
      </Select>
    </Toolbar>
  );
};
