import { useRef } from "react";
import { Canvas } from "./components/canvas/canvas.component";
import { Toolbar } from "./components/toolbar/toolbar.component";
import { ConstructorProvider } from "./features/constructor/contexts/constructor/pdf-constructor.context";
import { PreviewProvider } from "./features/constructor/contexts/preview/pdf-preview.context";

import { Tree } from "./components/tree/tree.component";
import { HelperBar } from "./components/helper-bar/helper-bar.component";
import { Sidebar } from "../sidebar/sidebar.component";
import { TransformWrapper } from "react-zoom-pan-pinch";

export const PDFConstructor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ConstructorProvider containerRef={containerRef}>
      <PreviewProvider>
        <div className="h-screen w-screen px-4 py-8">
          <TransformWrapper
            panning={{
              excluded: ["panningDisabled"],
              wheelPanning: true,
            }}
            wheel={{
              smoothStep: 0.025,
              wheelDisabled: true,
            }}
            minScale={0.5}
            centerOnInit
            centerZoomedOut
          >
            <Sidebar position="left">
              <Tree className="overflow-auto" />
            </Sidebar>

            <Canvas className="h-full w-full overflow-auto" />

            <Sidebar position="right">
              <Toolbar className="h-full overflow-auto" />
            </Sidebar>
          </TransformWrapper>
        </div>
        <HelperBar />
      </PreviewProvider>
    </ConstructorProvider>
  );
};
