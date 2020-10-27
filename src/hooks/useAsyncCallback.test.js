import { renderHook, act } from "@testing-library/react-hooks";
import { useAsyncCallback } from "./useAsyncCallback";

const asyncResolvingFunction = async () => {
  await new Promise((r) => setTimeout(r, 10));
  return "hello";
};

const asyncRejectingFunction = async () => {
  await new Promise((r) => setTimeout(r, 10));
  // eslint-disable-next-line
  throw "nope";
};

test.skip("starts out in the idle state", () => {
  const hook = renderHook(() => useAsyncCallback(asyncResolvingFunction));

  expect(hook.result.current).toMatchObject({
    status: "idle",
    data: undefined,
    error: undefined,
  });
});

test.skip("the success state is achieved", async () => {
  const hook = renderHook(() => useAsyncCallback(asyncResolvingFunction));

  expect(hook.result.current).toMatchObject({
    status: "idle",
    data: undefined,
    error: undefined,
  });

  act(() => {
    hook.result.current.call();
  });

  await hook.waitForNextUpdate();

  expect(hook.result.current).toMatchObject({
    status: "success",
    data: "hello",
    error: undefined,
  });
});

test.skip("the error state is achieved", async () => {
  const hook = renderHook(() => useAsyncCallback(asyncRejectingFunction));

  expect(hook.result.current).toMatchObject({
    status: "idle",
    data: undefined,
    error: undefined,
  });

  act(() => {
    hook.result.current.call();
  });

  await hook.waitForNextUpdate();

  expect(hook.result.current).toMatchObject({
    status: "error",
    data: undefined,
    error: "nope",
  });
});

test.skip("reset should work", async () => {
  const hook = renderHook(() => useAsyncCallback(asyncResolvingFunction));

  act(() => {
    hook.result.current.call();
  });

  await hook.waitForNextUpdate();

  act(() => {
    hook.result.current.reset();
  });

  expect(hook.result.current).toMatchObject({
    status: "idle",
    data: undefined,
    error: undefined,
  });
});

// TODO add more tests!
