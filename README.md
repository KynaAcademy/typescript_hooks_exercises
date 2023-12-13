# React hooks exercise bank

This is just a bunch of custom hooks that you can practice on.

Each of the hooks has a test file. You can run the tests using `npm run test` (or `yarn run test` if you prefer). By default, all the tests are skipped, like so:

```js
test.skip("some case", () => {
  // ...
});
```

You've solved an exercise if you've been able to make the hook work for each test case, which you can "unskip" by just removing the `.skip` part:

```js
test("some case", () => {
  // ...
});
```

Solutions for each of the exercises can be found in the Pull Requests.

## useToggle

The idea: when we're just working with a booling state cell, it's a bit of a nuisance to often have to write an extra `toggle` helper function. Implement this hook to satisfy the API:

```tsx
const [on, toggle] = useToggle();
const [on, toggle] = useToggle(initialValue);
```

where

```tsx
useToggle: (initialValue?: boolean) => [boolean, () => void];
```

## useEffectOnce

This hoop should be used like so:

```tsx
useEffectOnce(() => {
  console.log("hi");
});
```

and can also have a cleanup function, just like a normal effect:

```tsx
useEffectOnce(() => {
  console.log("hi");

  return () => {
    console.log("cleaning up");
  };
});
```

It should be called exactly once, as an effect.

## usePrevious

Sometimes you want to remember the "previous value", like in this game:

```tsx
function PubQuiz() {
  const [answer, setAnswer] = useState("Belgium");
  const previousAnswer = usePrevious(answer);

  return (
    <div>
      <p>Your answer: {answer}</p>
      <p>Your previous answer: {previousAnswer}</p>
      ...
    </div>
  );
}
```

The hook should always return the value that the variable had _in the previous render_.

_TODO add a "distinct" flag to save the previous value until distinctly new, not just a subsequent render._

## useLatest

_TODO describe_

## useValidated

Example usage:

```tsx
const useValidated = createUseValidated((email: string) => {
  return !!email.match(EMAIL_REGEX);
});

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const emailValid = useValidated(email);
  // emailValid: "idle" | "valid" | "invalid"
```

## useAsyncCallback

Example usage:

```tsx
const { call, callAsync, status, data, error } = useAsyncCallback(async () => {
  const res = await axios.get("...");
  const data = await res.json();
  return data;
});
```

## TODO: useRememberDeep

Example usage:

```tsx
const [name, setName] = useState("Gordon");

const params = useRememberDeep({
  name,
  hobbies: ["cooking", "yelling", "puns"],
});

// ^^ params has the same data as the value passed into the
//  hook, but is guaranteed to be referentially stable
//  as long as the value doesn't change structurally
```

## TODO: useDeepCompareEffect

Exammple usage:

```tsx
const [name, setName] = useState("Gordon");

const params = {
  name,
  hobbies: ["cooking", "yelling", "puns"],
};

useDeepCompareEffect(() => {
  // ...
}, [params]);
```

This effect should only run when it's dependencies array changes _structurally_. If a dependency is a different object reference but structurally the same as the previous render, don't run the effect.

(Should also support cleanup, just like regular effects.)

## TODO: useStateWithHistory

Example usage in a game of tic-tac-toe:

```tsx
const [board, setBoard, { undo, redo, history, index }] = useStateWithHistory([
  ["X", " ", "O"],
  ["O", " ", " "],
  [" ", " ", " "],
]);
```

The history behaves like browser history, which means that:

- if you "undo", you go back in history (if possible), but the history is kept in memory
- if you "redo", you go forward in history (if possible)
- if you set a new value, and there's "future history" which you've undone, then that future history is replaced with the new value

_Hint: use a single `useState` (or a single `useReducer`), instead of multiple state cells and/or `useRef`. You can also make it with refs or multiplle state cells, but it will be easier to think about it with just a single state cell._
