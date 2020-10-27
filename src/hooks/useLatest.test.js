import { useCallback } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useLatest } from "./useLatest";

test("it always returns a ref of the value which was passed in", () => {
  let value = 4;
  const hook = renderHook(() => useLatest(value));

  expect(hook.result.current).toEqual({ current: 4 });

  value = 5;
  act(() => {
    hook.rerender();
  });

  expect(hook.result.current).toEqual({ current: 5 });

  value = 6;
  act(() => {
    hook.rerender();
  });

  expect(hook.result.current).toEqual({ current: 6 });
});

test("this ref always contains the latest value, even if used within something memoized", () => {
  let value = 4;
  const hook = renderHook(() => {
    const latest = useLatest(value);

    const reporter = useCallback(() => {
      return latest.current;
      // eslint-disable-next-line
    }, []);

    return reporter;
  });

  const reporter1 = hook.result.current;
  expect(reporter1()).toBe(4);

  value = 5;
  act(() => {
    hook.rerender();
  });

  const reporter2 = hook.result.current;
  expect(reporter1).toBe(reporter2);
  expect(reporter2()).toBe(5);

  value = 6;
  act(() => {
    hook.rerender();
  });

  const reporter3 = hook.result.current;
  expect(reporter2).toBe(reporter3);
  expect(reporter3()).toBe(6);
});
