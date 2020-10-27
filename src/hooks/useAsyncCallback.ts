import { useRef, useState, useCallback, useEffect } from "react";

interface StateBase<R> {
  status: "idle" | "loading" | "error" | "success";
  data?: R;
  error?: any;
}

interface IdleState<R> extends StateBase<R> {
  status: "idle";
  data: undefined;
  error: undefined;
}

interface LoadingState<R> extends StateBase<R> {
  status: "loading";
  data: undefined;
  error: undefined;
}

interface ErrorState<R> extends StateBase<R> {
  status: "error";
  data: undefined;
  error: any;
}

interface SuccessState<R> extends StateBase<R> {
  status: "success";
  data: R;
  error: undefined;
}

export type State<R> =
  | IdleState<R>
  | LoadingState<R>
  | ErrorState<R>
  | SuccessState<R>;

export function useAsyncCallback<R = any, A extends any[] = any[]>(
  callback: (...args: A) => Promise<R>
): State<R> & {
  call: () => void;
  callAsync: () => Promise<R>;
  reset: () => void;
} {
  const latestId = useRef(0);

  const latestCallback = useRef(callback);
  latestCallback.current = callback;

  const [state, setState] = useState<State<R>>({
    status: "idle",
    data: undefined,
    error: undefined,
  });

  const callAsync = useCallback(
    async (...args: A) => {
      const callId = ++latestId.current;

      setState({
        status: "loading",
        data: undefined,
        error: undefined,
      });

      try {
        const value = await latestCallback.current(...args);
        if (latestId.current === callId) {
          setState({
            status: "success",
            data: value,
            error: undefined,
          });
        }
        return value;
      } catch (error) {
        if (latestId.current === callId) {
          setState({
            status: "error",
            data: undefined,
            error,
          });
        }
        throw error;
      }
    },
    [setState]
  );

  const call = useCallback(
    (...args: A) => {
      callAsync(...args).catch(() => {});
    },
    [callAsync]
  );

  const reset = useCallback(() => {
    latestId.current++;
    setState({
      status: "idle",
      data: undefined,
      error: undefined,
    });
  }, [setState]);

  useEffect(() => {
    return () => {
      latestId.current = latestId.current + 1;
    };
  }, []);

  return {
    ...state,
    call,
    callAsync,
    reset,
  };
}
