import { cn } from "@/shared/utils/cn.util";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  children?: React.ReactNode;
  position: "left" | "right";
};

export const Sidebar: React.FC<SidebarProps> = ({ position, children }) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        className={cn(
          "text-primary fixed top-10 z-50 flex size-8 items-center justify-center rounded bg-slate-100 transition-colors hover:bg-slate-200",
          position === "left" ? "left-10" : "right-10"
        )}
        onClick={() => setOpen(true)}
      >
        <SidebarOpenIcon className="size-4" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-50 w-96 bg-white px-4 py-8 shadow-lg",
        position === "left" ? "left-0" : "right-0"
      )}
    >
      <div className="flex justify-end">
        <button
          className="text-primary mb-4 flex size-8 items-center justify-center rounded bg-slate-100 transition-colors hover:bg-slate-200"
          onClick={() => setOpen(false)}
        >
          <SidebarCloseIcon className="size-4" />
        </button>
      </div>
      {children}
    </div>
  );
};
