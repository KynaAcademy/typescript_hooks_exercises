import { renderHook, act } from "@testing-library/react-hooks";
import { useStateWithHistory } from "./useStateWithHistory";

test("it should set the initial state", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  expect(hook.result.current[0]).toBe(4);
});

test("but not change the state if the initial state values changes", () => {
  let value = 4;
  const hook = renderHook(() => useStateWithHistory(value));

  value = 5;
  act(() => {
    hook.rerender();
  });
  expect(hook.result.current[0]).toBe(4);
});

test("setting the state should be possible", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  expect(hook.result.current[0]).toBe(5);
});

test("initially, history is array with single element (initialValue)", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  expect(hook.result.current[2]).toMatchObject({ index: 0, history: [4] });
});

test("setting the value should add to history and increment the index", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  expect(hook.result.current[2]).toMatchObject({ index: 1, history: [4, 5] });
});

test("undoing should reset to previous value, but keep the history", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  act(() => {
    hook.result.current[2].undo();
  });
  expect(hook.result.current[0]).toBe(4);
  expect(hook.result.current[2]).toMatchObject({ index: 0, history: [4, 5] });
});

test("undoing should not do anything if already at index 0", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].undo();
  });
  expect(hook.result.current[0]).toBe(4);
  expect(hook.result.current[2]).toMatchObject({ index: 0, history: [4, 5] });
});

test("redoing should go to the next value, keeping history", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].redo();
  });
  expect(hook.result.current[0]).toBe(5);
  expect(hook.result.current[2]).toMatchObject({ index: 1, history: [4, 5] });
});

test("redoing should not do anything if already at end if history", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].redo();
  });
  act(() => {
    hook.result.current[2].redo();
  });
  act(() => {
    hook.result.current[2].redo();
  });
  expect(hook.result.current[0]).toBe(5);
  expect(hook.result.current[2]).toMatchObject({ index: 1, history: [4, 5] });
});

test("setting the value should replace any future history with new value", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  act(() => {
    hook.result.current[1](5);
  });
  act(() => {
    hook.result.current[1](6);
  });
  act(() => {
    hook.result.current[1](7);
  });
  act(() => {
    hook.result.current[2].undo();
  });
  act(() => {
    hook.result.current[2].undo();
  });
  expect(hook.result.current[2]).toMatchObject({
    index: 1,
    history: [4, 5, 6, 7],
  });

  act(() => {
    hook.result.current[1](42);
  });
  expect(hook.result.current[2]).toMatchObject({
    index: 2,
    history: [4, 5, 42],
  });
});

test("the setter function is referentially stable", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  const [, setValue1] = hook.result.current;

  act(() => {
    setValue1(5);
  });

  const [, setValue2] = hook.result.current;

  expect(setValue1).toBe(setValue2);
});

test("the undo function is referentially stable", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  const [, setValue, { undo: undo1 }] = hook.result.current;

  act(() => {
    setValue(5);
  });

  const [, , { undo: undo2 }] = hook.result.current;

  expect(undo1).toBe(undo2);
});

test("the redo function is referentially stable", () => {
  const hook = renderHook(() => useStateWithHistory(4));

  const [, setValue, { redo: redo1 }] = hook.result.current;

  act(() => {
    setValue(5);
  });

  const [, , { redo: redo2 }] = hook.result.current;

  expect(redo1).toBe(redo2);
});
