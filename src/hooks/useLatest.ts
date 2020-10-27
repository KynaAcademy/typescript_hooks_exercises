import { useRef, MutableRefObject } from "react";

export function useLatest<T>(value: T): MutableRefObject<T> {
  const latest = useRef(value);
  latest.current = value;
  return latest;
}
