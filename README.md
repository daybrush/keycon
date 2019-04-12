# keycon  [![npm version](https://badge.fury.io/js/keycon.svg)](https://badge.fury.io/js/keycon) 

Keyboard Controller

* [API Documentation](https://daybrush.com/keycon/release/latest/doc/)


## Installation
```
npm i keycon
```
```html
<script src="https://daybrush.com/keycon/release/latest/dist/keycon.pkgd.min.js"></script>
```


## How to use

```js
import KeyController from "keycon";

const keycon = new KeyController();

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