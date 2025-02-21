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
        <div className="grid h-[calc(100vh-4rem)] grid-cols-4 gap-4">
          <div className="overflow-hidden">Tree</div>

          <div className="col-span-2 flex overflow-hidden">
            <div className="flex-1 overflow-auto">
              <Preview />
            </div>
          </div>

          <div className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      </PreviewProvider>
    </ConstructorProvider>
  );
};
