import { act, renderHook } from "@testing-library/react";

import { createUseValidated } from "./useValidated";

test.skip("starts out idle", () => {
  const useValidated = createUseValidated(() => true);

  const hook = renderHook(() => useValidated());

  expect(hook.result.current).toBe("idle");
});

test.skip("stays idle as long as a nullish value is given", () => {
  const useValidated = createUseValidated(() => true);

  let value = undefined;
  const hook = renderHook(() => useValidated(value));

  act(() => {
    hook.rerender();
  });

  expect(hook.result.current).toBe("idle");

  act(() => {
    value = null;
    hook.rerender();
  });

  expect(hook.result.current).toBe("idle");
});

test.skip("starts out with correct validation", () => {
  const useValidated = createUseValidated((value) => {
    return value.indexOf("a") >= 0;
  });

  let value = "berate";
  const hook = renderHook(() => useValidated(value));

  expect(hook.result.current).toBe("valid");
});

test.skip("revalidates when value changes", () => {
  const useValidated = createUseValidated((value) => {
    return value.indexOf("a") >= 0;
  });

  let value = "apple";
  const hook = renderHook(() => useValidated(value));

  expect(hook.result.current).toBe("valid");

  act(() => {
    value = "blorgh";
    hook.rerender();
  });

  expect(hook.result.current).toBe("invalid");

  act(() => {
    value = undefined;
    hook.rerender();
  });

  expect(hook.result.current).toBe("idle");

  act(() => {
    value = "blabla";
    hook.rerender();
  });

  expect(hook.result.current).toBe("valid");
});
