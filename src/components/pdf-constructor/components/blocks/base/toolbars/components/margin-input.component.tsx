import { cn } from "@/shared/utils/cn.util";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type Value = {
  bottom: number;
  top: number;
  right: number;
  left: number;
};

type MarginInputProps = {
  value: Value;
  onChange: <K extends keyof Value>(key: K, value: Value[K]) => void;
  className?: string;
};

export const MarginInput: React.FC<MarginInputProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className="@container">
      <p>Margins</p>
      <div
        className={cn(
          "grid grid-cols-1 gap-0.5 *:not-first:rounded-l-none *:not-last:rounded-r-none @xs:grid-cols-4",
          className
        )}
      >
        <div className="focus-within:ring-ring flex h-9 min-w-9 items-center rounded border bg-white focus-within:ring">
          <input
            className="w-full flex-1 bg-transparent text-center outline-none"
            placeholder="1"
            value={value.left}
            type="number"
            onChange={(event) => onChange("left", parseInt(event.target.value))}
          />
          <span className="text-muted-foreground">
            <ArrowLeft className="size-4" />
          </span>
        </div>

        <div className="focus-within:ring-ring flex h-9 min-w-9 items-center rounded border bg-white focus-within:ring">
          <input
            className="w-full flex-1 bg-transparent text-center outline-none"
            placeholder="1"
            value={value.top}
            type="number"
            onChange={(event) => onChange("top", parseInt(event.target.value))}
          />
          <span className="text-muted-foreground">
            <ArrowUp className="size-4" />
          </span>
        </div>

        <div className="focus-within:ring-ring flex h-9 min-w-9 items-center rounded border bg-white focus-within:ring">
          <input
            className="w-full flex-1 bg-transparent text-center outline-none"
            placeholder="1"
            value={value.right}
            type="number"
            onChange={(event) =>
              onChange("right", parseInt(event.target.value))
            }
          />
          <span className="text-muted-foreground">
            <ArrowRight className="size-4" />
          </span>
        </div>

        <div className="focus-within:ring-ring flex h-9 min-w-9 items-center rounded border bg-white focus-within:ring">
          <input
            className="w-full flex-1 bg-transparent text-center outline-none"
            placeholder="1"
            value={value.bottom}
            type="number"
            onChange={(event) =>
              onChange("bottom", parseInt(event.target.value))
            }
          />
          <span className="text-muted-foreground">
            <ArrowDown className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
