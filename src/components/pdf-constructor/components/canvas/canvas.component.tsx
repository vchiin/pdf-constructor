import { TransformComponent } from "react-zoom-pan-pinch";
import { InnerCanvas } from "./components/inner-canvas.component";
import { usePreview } from "../../features/constructor/contexts/preview/pdf-preview.context";

type CanvasProps = {
  className?: string;
};

export const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { deselectBlock } = usePreview();
  return (
    <div className="h-full w-full" onClick={deselectBlock}>
      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <InnerCanvas className={className} />
      </TransformComponent>
    </div>
  );
};
