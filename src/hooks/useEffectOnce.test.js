import { act, renderHook } from "@testing-library/react";

import { useEffectOnce } from "./useEffectOnce";

test.skip("it runs the effect", () => {
  const fn = jest.fn();

  renderHook(() => useEffectOnce(fn));

  expect(fn).toBeCalledTimes(1);
});

test.skip("it runs the effect only once", () => {
  const fn = jest.fn();

  const hook = renderHook(() => useEffectOnce(fn));

  act(() => {
    hook.rerender();
    hook.rerender();
    hook.rerender();
  });

  expect(fn).toBeCalledTimes(1);
});
