import { useRef } from "react";
import { Canvas } from "./components/canvas/canvas.component";
import Sidebar from "./components/sidebar/sidebar.component";
import { ConstructorProvider } from "./features/constructor/contexts/constructor/pdf-constructor.context";
import { PreviewProvider } from "./features/constructor/contexts/preview/pdf-preview.context";

import { Tree } from "./components/tree/tree.component";
import { HelperBar } from "./components/helper-bar/helper-bar.component";

export const PDFConstructor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ConstructorProvider containerRef={containerRef}>
      <PreviewProvider>
        <div className="grid h-[calc(100vh-4rem)] grid-cols-6 gap-4">
          <Tree className="overflow-auto" />
          <Canvas className="col-span-3 overflow-auto" />
          <Sidebar className="col-span-2 overflow-auto" />
        </div>
        <HelperBar />
      </PreviewProvider>
    </ConstructorProvider>
  );
};
