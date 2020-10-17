/*
Copyright (c) Daybrush
name: keycon
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/keycon.git
version: 1.1.1
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@daybrush/utils")):"function"==typeof define&&define.amd?define(["@daybrush/utils"],t):(e=e||self).keycon=t(e.utils)}(this,function(a){"use strict";var s=function(e,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};var e=function(){function e(){this._events={}}var t=e.prototype;return t.on=function(e,t){if(a.isObject(e))for(var n in e)this.on(n,e[n]);else this._addEvent(e,t,{});return this},t.off=function(e,t){if(e)if(a.isObject(e))for(var n in e)this.off(n);else{var r,o;t?!(r=this._events[e])||-1<(o=a.findIndex(r,function(e){return e.listener===t}))&&r.splice(o,1):this._events[e]=[]}else this._events={};return this},t.once=function(t,e){var n=this;return e&&this._addEvent(t,e,{once:!0}),new Promise(function(e){n._addEvent(t,e,{once:!0})})},t.emit=function(t,n){var r=this;void 0===n&&(n={});var e=this._events[t];if(!t||!e)return!0;var o=!1;return n.eventType=t,n.stop=function(){o=!0},n.currentTarget=this,function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),o=0,t=0;t<n;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)r[o]=i[a];return r}(e).forEach(function(e){e.listener(n),e.once&&r.off(t,e.listener)}),o},t.trigger=function(e,t){return void 0===t&&(t={}),this.emit(e,t)},t._addEvent=function(e,t,n){var r=this._events;r[e]=r[e]||[],r[e].push(o({listener:t},n))},e}();var t,u,n=(function(e,t){function n(e){var t;if(!e||"object"!=typeof e||(t=e.which||e.keyCode||e.charCode)&&(e=t),"number"==typeof e)return a[e];var n=String(e),r=o[n.toLowerCase()];return r||((r=i[n.toLowerCase()])?r:1===n.length?n.charCodeAt(0):void 0)}n.isEventKey=function(e,t){if(e&&"object"==typeof e){var n=e.which||e.keyCode||e.charCode;if(null==n)return!1;if("string"==typeof t){var r=o[t.toLowerCase()];if(r)return r===n;if(r=i[t.toLowerCase()])return r===n}else if("number"==typeof t)return t===n;return!1}};for(var o=(t=e.exports=n).code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},i=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91},r=97;r<123;r++)o[String.fromCharCode(r)]=r-32;for(var r=48;r<58;r++)o[r-48]=r;for(r=1;r<13;r++)o["f"+r]=r+111;for(r=0;r<10;r++)o["numpad "+r]=r+96;var a=t.names=t.title={};for(r in o)a[o[r]]=r;for(var s in i)o[s]=i[s]}(t={exports:{}},t.exports),t.exports),r=(n.code,n.codes,n.aliases,n.names),i=(n.title,{"+":"plus","left command":"meta","right command":"meta"}),f={shift:1,ctrl:2,alt:3,meta:4};function c(e){var t=r[e]||"";for(var n in i)t=t.replace(n,i[n]);return t.replace(/\s/g,"")}function l(e,t){void 0===t&&(t=c(e.keyCode));var n,r=[(n=e).shiftKey&&"shift",n.ctrlKey&&"ctrl",n.altKey&&"alt",n.metaKey&&"meta"].filter(Boolean);return-1===r.indexOf(t)&&r.push(t),r.filter(Boolean)}function y(e){var t=e.slice();return t.sort(function(e,t){return(f[e]||5)-(f[t]||5)}),t}var d=function(n){function e(){this.constructor=t}var t,r;function o(e){void 0===e&&(e=window);var t=n.call(this)||this;return t.container=e,t.ctrlKey=!1,t.altKey=!1,t.shiftKey=!1,t.metaKey=!1,t.clear=function(){return t.ctrlKey=!1,t.altKey=!1,t.shiftKey=!1,t.metaKey=!1,t},t.keydownEvent=function(e){t.triggerEvent("keydown",e)},t.keyupEvent=function(e){t.triggerEvent("keyup",e)},t.blur=function(){t.clear(),t.trigger("blur")},a.addEvent(e,"blur",t.blur),a.addEvent(e,"keydown",t.keydownEvent),a.addEvent(e,"keyup",t.keyupEvent),t}s(t=o,r=n),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e);var i=o.prototype;return Object.defineProperty(o,"global",{get:function(){return u=u||new o},enumerable:!1,configurable:!0}),o.setGlobal=function(){return this.global},i.destroy=function(){var e=this.container;this.clear(),this.off(),a.removeEvent(e,"blur",this.blur),a.removeEvent(e,"keydown",this.keydownEvent),a.removeEvent(e,"keyup",this.keyupEvent)},i.keydown=function(e,t){return this.addEvent("keydown",e,t)},i.offKeydown=function(e,t){return this.removeEvent("keydown",e,t)},i.offKeyup=function(e,t){return this.removeEvent("keyup",e,t)},i.keyup=function(e,t){return this.addEvent("keyup",e,t)},i.addEvent=function(e,t,n){return a.isArray(t)?this.on(e+"."+y(t).join("."),n):a.isString(t)?this.on(e+"."+t,n):this.on(e,t),this},i.removeEvent=function(e,t,n){return a.isArray(t)?this.off(e+"."+y(t).join("."),n):a.isString(t)?this.off(e+"."+t,n):this.off(e,t),this},i.triggerEvent=function(e,t){this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey,this.altKey=t.altKey,this.metaKey=t.metaKey;var n=c(t.keyCode),r={key:n,isToggle:"ctrl"===n||"shift"===n||"meta"===n||"alt"===n,inputEvent:t,keyCode:t.keyCode,ctrlKey:t.ctrlKey,altKey:t.altKey,shiftKey:t.shiftKey,metaKey:t.metaKey};this.trigger(e,r),this.trigger(e+"."+n,r);var o=l(t,n);1<o.length&&this.trigger(e+"."+o.join("."),r)},o}(e);return d.getKey=c,d.getCombi=l,d});
//# sourceMappingURL=keycon.js.map
