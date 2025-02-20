import { useRef } from "react";
import { Preview } from "./components/preview/preview.component";
import Sidebar from "./components/sidebar/sidebar.component";
import { ConstructorProvider } from "./contexts/constructor/pdf-constructor.context";

import { PreviewProvider } from "./contexts/preview/pdf-preview.context";

export const PDFConstructor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ConstructorProvider containerRef={containerRef}>
      <PreviewProvider>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2 rounded border p-4 shadow">
            <Sidebar />
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded border p-4 shadow">
            <h3 className="text-lg font-bold">Preview</h3>
            <Preview />
          </div>
        </div>
      </PreviewProvider>
    </ConstructorProvider>
  );
};
