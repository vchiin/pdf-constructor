import { createContext, useContext } from "react";

const ScrollerContext = createContext<{
  scrollTo: (to: number) => void;
  calculateOffset: (element: HTMLElement) => number;
  containerRef: React.RefObject<HTMLDivElement>;
} | null>(null);

export const ScrollerProvider = ({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const calculateOffset = (element: HTMLElement) => {
    let offsetTop = 0;
    let currentElement = element;

    while (currentElement && currentElement !== containerRef.current) {
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent as HTMLElement;
    }

    return offsetTop;
  };

  const scrollTo = (to: number) => {
    if (!containerRef.current) {
      return;
    }

    const size = containerRef.current.clientHeight;
    const scrollTop = containerRef.current.scrollTop;

    const isInView = to >= scrollTop && to <= scrollTop + size;

    if (isInView) {
      return;
    }

    const top = to < scrollTop ? Math.max(to - size, 0) : to;

    containerRef.current.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <ScrollerContext.Provider
      value={{ scrollTo, calculateOffset, containerRef }}
    >
      {children}
    </ScrollerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useScroller = () => {
  const context = useContext(ScrollerContext);
  if (!context) {
    throw new Error("useScroller must be used within a ScrollerContext");
  }

  return context;
};
