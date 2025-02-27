import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { PreviewContextType } from "./pdf-preview-context.types";
import { BlockId } from "@/components/pdf-constructor/shared/types/utils.types";

const PreviewContext = createContext<PreviewContextType | null>(null);

type PreviewProviderProps = {
  children: React.ReactNode;
};

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<BlockId | null>(null);

  const selectBlock = useCallback((id: BlockId) => setSelectedId(id), []);

  const deselectBlock = useCallback(() => setSelectedId(null), []);

  return (
    <PreviewContext.Provider
      value={{
        containerRef,
        selectedBlockId: selectedId,
        selectBlock,
        deselectBlock,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};
