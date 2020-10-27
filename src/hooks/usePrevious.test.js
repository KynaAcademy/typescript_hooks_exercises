import { renderHook, act } from "@testing-library/react-hooks";
import { usePrevious } from "./usePrevious";

test.skip("it starts out as undefined", () => {
  let value = 4;
  const hook = renderHook(() => usePrevious(value));

  expect(hook.result.current).toBe(undefined);
});

test.skip("it always returns the previous value", () => {
  let value = 4;
  const hook = renderHook(() => usePrevious(value));

  expect(hook.result.current).toBe(undefined);

  act(() => {
    hook.rerender();
  });
  expect(hook.result.current).toBe(4);

  value = 5;

  act(() => {
    hook.rerender();
  });
  expect(hook.result.current).toBe(4);

  act(() => {
    hook.rerender();
  });
  expect(hook.result.current).toBe(5);
});
