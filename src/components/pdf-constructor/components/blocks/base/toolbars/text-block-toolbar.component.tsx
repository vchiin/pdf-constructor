import { Toolbar } from "./toolbar.component";
import { TextBlock } from "@/components/pdf-constructor/shared/types/block.types";

import { useBlockUpdate } from "@/components/pdf-constructor/hooks/use-block-update.hook";
import { Checkbox } from "@/components/ui/checkbox";
import { BlockElementProps } from "../shared/types/element.types";
import { memo } from "react";

type TextBlockToolbarProps = BlockElementProps<TextBlock>;

export const TextBlockToolbar: React.FC<TextBlockToolbarProps> = memo(
  ({ block }) => {
    const [value, setValue] = useBlockUpdate(block);

    return (
      <Toolbar title="Text">
        <input
          className="focus-within:ring-ring w-full rounded border px-2 py-1 outline-none focus-within:ring-2"
          value={value.color}
          placeholder="#000000"
          onChange={(event) => setValue("color", event.target.value)}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            checked={value.bold}
            onCheckedChange={(checked) => setValue("bold", checked as boolean)}
            id="bold"
          />
          <label className="text-sm font-medium" htmlFor="bold">
            Bold
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={value.italic}
            onCheckedChange={(checked) =>
              setValue("italic", checked as boolean)
            }
            id="italic"
          />
          <label className="text-sm font-medium" htmlFor="italic">
            Italic
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={value.underline}
            onCheckedChange={(checked) =>
              setValue("underline", checked as boolean)
            }
            id="underline"
          />
          <label className="text-sm font-medium" htmlFor="underline">
            Underline
          </label>
        </div>
      </Toolbar>
    );
  }
);
