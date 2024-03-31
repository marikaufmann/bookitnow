import { RefObject, useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const element = ref.current;
      if (!element || element.contains(e.target as Node) || null) {
        return;
      } else {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    document.removeEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
