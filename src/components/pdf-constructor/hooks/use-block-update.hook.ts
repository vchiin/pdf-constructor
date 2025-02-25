import { useCallback, useEffect, useRef, useState } from "react";
import { useConstructor } from "../contexts/constructor/pdf-constructor.context";
import { Block } from "../shared/types/block.types";

const handleValueArgument = <V>(cb: ((prev: V) => V) | V, prevValue: V): V => {
  if (typeof cb === "function") {
    return (cb as (prev: V) => V)(prevValue);
  }

  return cb;
};

export const useBlockUpdate = <B extends Block>(block: B) => {
  const { update: updateBlock } = useConstructor();
  const [state, setState] = useState(block);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setState(block);
  }, [block]);

  const update = useCallback(
    <K extends keyof B>(key: K, value: B[K] | ((prev: B[K]) => B[K])) => {
      setState((prev) => {
        const newState = {
          ...prev,
          [key]: handleValueArgument(value, prev[key]),
        };

        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }

        intervalRef.current = setTimeout(() => {
          updateBlock(newState);
        }, 1000);

        return newState;
      });
    },
    [updateBlock]
  );

  return [state, update] as const;
};
