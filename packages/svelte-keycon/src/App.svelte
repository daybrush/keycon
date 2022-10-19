<script>
  import { useKeycon } from "./svelte-keycon/index.ts";

  const { isKeydown } = useKeycon({
    keys: ["shift"],
  });
</script>

<div class="App">
  { $isKeydown ? "keydown" : "keyup"}
</div>
