import { useRef, useEffect } from "react";

export function usePrevious<T>(value: T) {
  const prev = useRef<T>();

  useEffect(() => {
    prev.current = value;
  });

  return prev.current;
}
