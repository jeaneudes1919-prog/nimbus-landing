import { useEffect } from "react";

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
