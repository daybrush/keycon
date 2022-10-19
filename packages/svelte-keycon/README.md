# svelte-keycon  [![npm version](https://badge.fury.io/js/vue-svelte.svg)](https://badge.fury.io/js/svelte-keycon) 

Svelte Keyboard Controller

## Installation
```
npm i svelte-keycon
```

## How to use
```svelte
<script>
import { ref } from "@cfcs/svelte";
import { useKeycon } from "svlete-keycon";


const containerRef = ref();
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
});

onKeyup(() => {
  console.log("keyup");
});

onBlur(() => {
  console.log("blur");
});
</script>
<div use:containerRef>{ $isKeydown ? "keydown" : "keyup" }</div>
```