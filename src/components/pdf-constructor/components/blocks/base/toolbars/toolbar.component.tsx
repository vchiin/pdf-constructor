import { useRef } from "react";

type ToolbarProps = {
  title: string;
  children: React.ReactNode;
};

export const Toolbar = ({ title, children }: ToolbarProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      <h3 className="border-b-primary mb-2 border-b-2 text-sm font-bold">
        {title}
      </h3>

      {children}
    </div>
  );
};
