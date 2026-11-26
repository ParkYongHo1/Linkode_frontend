import { useEffect, useState } from "react";

export function useIsVisible() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => {
      cancelAnimationFrame(frame);
      setIsVisible(false);
    };
  }, []);

  return isVisible;
}
