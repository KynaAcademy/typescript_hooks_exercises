import { useEffect, useState } from "react";

export type ValidationStatus = "idle" | "valid" | "invalid";

export function createUseValidated<T>(validate: (value: T) => boolean) {
  return function useValidated(value: T) {
    const [status, setStatus] = useState<ValidationStatus>(() => {
      return nullish(value) ? "idle" : validate(value) ? "valid" : "invalid";
    });

    useEffect(() => {
      setStatus(
        nullish(value) ? "idle" : validate(value) ? "valid" : "invalid"
      );
    }, [value, setStatus]);

    return status;
  };
}

function nullish(value: any) {
  return typeof value === "undefined" || value === null;
}
