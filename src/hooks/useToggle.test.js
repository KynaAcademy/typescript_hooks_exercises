import { renderHook, act } from "@testing-library/react-hooks";
import { useToggle } from "./useToggle";

test.skip("returns the right data", () => {
  const hook = renderHook(() => useToggle());

  const [on1, toggle1] = hook.result.current;
  expect(on1).toBe(false);
  expect(typeof toggle1).toBe("function");
});

test.skip("can toggle", () => {
  const hook = renderHook(() => useToggle());

  const [on1, toggle1] = hook.result.current;
  expect(on1).toBe(false);

  act(() => {
    toggle1();
  });

  const [on2] = hook.result.current;
  expect(on2).toBe(true);
});

test.skip("toggle function is referentially stable", () => {
  const hook = renderHook(() => useToggle());

  const [, toggle1] = hook.result.current;

  act(() => {
    toggle1();
  });

  const [, toggle2] = hook.result.current;

  expect(toggle1).toBe(toggle2);
});
