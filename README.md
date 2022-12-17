# keycon  [![npm version](https://badge.fury.io/js/keycon.svg)](https://badge.fury.io/js/keycon) 

Keyboard Controller

* [API Documentation](https://daybrush.com/keycon/release/latest/doc/)

### Frameworks
* [React](https://github.com/daybrush/keycon/tree/master/packages/react-keycon)
* [Vue2](https://github.com/daybrush/keycon/tree/master/packages/vue2-keycon)
* [Vue3](https://github.com/daybrush/keycon/tree/master/packages/vue-keycon)
* [Svelte](https://github.com/daybrush/keycon/tree/master/packages/svelte-keycon)

## Installation
```
npm i keycon
```
```html
<script src="https://daybrush.com/keycon/release/latest/dist/keycon.min.js"></script>
```


## How to use

```js
import KeyController, { getCombi, getKey } from "keycon";

const keycon = new KeyController();

// The focus went out of the browser.
keycon.on("blur", () => {
    console.log("blur");
});
// keydown all
keycon.keydown(e => {
    console.log(e);
});
// keydown space
keycon.keydown("space", e => {
    console.log(e);
});
// keydown alt + space combination
keycon.keydown(["alt", "space"], e => {
    // ["alt", "space"]
    console.log(getCombi(e));
    // "space"
    console.log(getKey(e.keyCode));

    console.log(e);
});

// keyup all
keycon.keyup(e => {
    console.log(e);
});
// keyup space
keycon.keydown("space", e => {
    console.log(e);
});
// keyup alt + space combination
keycon.keyup(["alt", "space"], e => {
    console.log(e);
});
```