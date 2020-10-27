import { useState, useCallback } from "react";

export function useToggle(initiallyOn = false) {
  const [on, setOn] = useState(initiallyOn);

  const toggle = useCallback(() => {
    setOn((on) => !on);
  }, [setOn]);

  return [on, toggle];
}
