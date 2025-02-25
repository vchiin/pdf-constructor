import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PreviewContextType } from "./pdf-preview-context.types";
import { BlockId } from "../../shared/types/utils.types";

const PreviewContext = createContext<PreviewContextType | null>(null);

type PreviewProviderProps = {
  children: React.ReactNode;
};

const mousedownHandler = (event: MouseEvent) => {
  event.stopPropagation();
};

const setMousedownHandlers = (elements: HTMLElement[]) => {
  for (const element of elements) {
    element.addEventListener("mousedown", mousedownHandler);
  }
};

const unsetMousedownHandlers = (elements: HTMLElement[]) => {
  for (const element of elements) {
    element.removeEventListener("mousedown", mousedownHandler);
  }
};

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<BlockId | null>(null);

  // elements interaction with which wouldn't unselect the selected element
  const [selectionProtectedElements, setSelectionProtectedElements] = useState<
    HTMLElement[]
  >([]);

  useEffect(() => {
    console.log(selectionProtectedElements);
    return () => {
      unsetMousedownHandlers(selectionProtectedElements);
    };
  }, [selectionProtectedElements]);

  const selectBlock = useCallback((id: BlockId) => setSelectedId(id), []);

  const deselectBlock = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    if (selectedId) {
      document.body.addEventListener("mousedown", deselectBlock);
      setMousedownHandlers(selectionProtectedElements);
      return;
    }

    document.body.removeEventListener("mousedown", deselectBlock);
    unsetMousedownHandlers(selectionProtectedElements);
  }, [selectedId, selectionProtectedElements, deselectBlock]);

  const appendProtectedElement = useCallback((element: HTMLElement) => {
    setSelectionProtectedElements((state) => [...state, element]);
  }, []);

  const removeProtectedElement = useCallback((element: HTMLElement) => {
    setSelectionProtectedElements((state) =>
      state.filter((e) => !e.isSameNode(element))
    );
  }, []);

  return (
    <PreviewContext.Provider
      value={{
        containerRef,
        selectedBlockId: selectedId,
        selectBlock,
        deselectBlock,
        appendProtectedElement,
        removeProtectedElement,
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
