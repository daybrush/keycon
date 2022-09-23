# vue-keycon  [![npm version](https://badge.fury.io/js/vue-keycon.svg)](https://badge.fury.io/js/vue-keycon) 

Vue 3 Keyboard Controller

## Installation
```
npm i vue-keycon
```

## How to use

```vue
<template>
  <div>{{ isKeydown ? "keydown" : "keyup" }}</div>
</template>
<script>
import { useKeycon } from "vue-keycon";

export default {
  setup() {
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

    return {
      isKeydown,
    };
  }
}


```