import { useState, useCallback } from "react";

export function useStateWithHistory<T>(initialValue: T) {
  const [state, setState] = useState({
    index: 0,
    history: [initialValue],
  });

  const value = state.history[state.index];

  const setValue = useCallback(
    (newValue: T) => {
      setState((currentState) => {
        return {
          index: currentState.index + 1,
          history: [
            ...currentState.history.slice(0, currentState.index + 1),
            newValue,
          ],
        };
      });
    },
    [setState]
  );

  const undo = useCallback(() => {
    setState((currentState) => {
      if (currentState.index === 0) {
        return currentState;
      } else {
        return {
          ...currentState,
          index: currentState.index - 1,
        };
      }
    });
  }, [setState]);

  const redo = useCallback(() => {
    setState((currentState) => {
      if (currentState.index === currentState.history.length - 1) {
        return currentState;
      } else {
        return {
          ...currentState,
          index: currentState.index + 1,
        };
      }
    });
  }, [setState]);

  return [value, setValue, { ...state, undo, redo }];
}
