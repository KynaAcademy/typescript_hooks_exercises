import { EffectCallback, useEffect } from "react";

export function useEffectOnce(fn: EffectCallback) {
  // eslint-disable-next-line
  useEffect(fn, []);
}
