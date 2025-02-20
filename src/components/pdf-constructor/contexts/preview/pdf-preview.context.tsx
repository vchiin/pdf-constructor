import { createContext, useContext, useRef } from "react";
import { PreviewContextType } from "./pdf-preview-context.types";

const PreviewContext = createContext<PreviewContextType | null>(null);

type PreviewProviderProps = {
  children: React.ReactNode;
};

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <PreviewContext.Provider value={{ containerRef }}>
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
