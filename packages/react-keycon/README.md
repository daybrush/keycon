# react-keycon  [![npm version](https://badge.fury.io/js/react-keycon.svg)](https://badge.fury.io/js/react-keycon) 

React Keyboard Controller

## Installation
```
npm i react-keycon
```

## How to use

```tsx
import { useKeycon } from "keycon";

const {
  isKeydown,
  onBlur,
  onKeydown,
  onKeyup,
} = useKeycon({
  // If you want to specify a specific input, use ref. If not used, the event is used for the window.
  ref: containerRef,
  keys: ["shift"],
});

onKeydown(() => {
  console.log("keydown");
}, []);

onKeyup(() => {
  console.log("keyup");
}, []);

onBlur(() => {
  console.log("blur");
}, []);

return <div>{isKeydown ? "keydown" : "keyup"}</div>;
```