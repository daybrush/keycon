<template>
  <div class="App">
    {{ isKeydown ? "keydown" : "keyup" }}
  </div>
</template>
<script>
import { useKeycon } from "../src/index";

export default {
  setup() {
    const { isKeydown } = useKeycon({
      keys: ["shift"],
    });

    return {
      isKeydown,
    };
  },
};
</script>
