# vue2-keycon  [![npm version](https://badge.fury.io/js/vue2-keycon.svg)](https://badge.fury.io/js/vue2-keycon) 

Vue 2 Keyboard Controller

## Installation
If Vue is less than 2.7 version, install the composition-api together.

```bash
$ npm install @vue/composition-api
$ npm i vue2-keycon
```

## How to use

```vue
<template>
  <div>{{ isKeydown ? "keydown" : "keyup" }}</div>
</template>
<script>
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api';
import { useKeycon } from "vue2-keycon";

// @vue/composition-api is required to use vue2-keycon
Vue.use(VueCompositionAPI);


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
    });

    onKeyup(() => {
      console.log("keyup");
    });

    onBlur(() => {
      console.log("blur");
    });

    return {
      isKeydown,
    };
  }
}


```