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

_TODO describe_

## useAsyncCallback

_TODO describe_

## TODO: useRememberDeep

_TODO write tests_

## TODO: useDeepCompareEffect

_TODO write tests_

## TODO: useStateWithHistory

_TODO write tests for a hook like this:_

```tsx
const [value, setValue, { undo, redo, history }] = useStateWithHistory(
  "some value"
);
```
