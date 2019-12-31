/*
Copyright (c) Daybrush
name: keycon
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/keycon.git
version: 0.7.0
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@egjs/component"),require("@daybrush/utils")):"function"==typeof define&&define.amd?define(["@egjs/component","@daybrush/utils"],t):(e=e||self).keycon=t(e.eg.Component,e.utils)}(this,function(e,r){"use strict";var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var t,i,n=(function(e,t){function n(e){if(e&&"object"==typeof e){var t=e.which||e.keyCode||e.charCode;t&&(e=t)}if("number"==typeof e)return a[e];var n,r=String(e);return(n=o[r.toLowerCase()])?n:(n=i[r.toLowerCase()])||(1===r.length?r.charCodeAt(0):void 0)}n.isEventKey=function(e,t){if(e&&"object"==typeof e){var n=e.which||e.keyCode||e.charCode;if(null==n)return!1;if("string"==typeof t){var r;if(r=o[t.toLowerCase()])return r===n;if(r=i[t.toLowerCase()])return r===n}else if("number"==typeof t)return t===n;return!1}};var o=(t=e.exports=n).code=t.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},i=t.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,spacebar:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};for(r=97;r<123;r++)o[String.fromCharCode(r)]=r-32;for(var r=48;r<58;r++)o[r-48]=r;for(r=1;r<13;r++)o["f"+r]=r+111;for(r=0;r<10;r++)o["numpad "+r]=r+96;var a=t.names=t.title={};for(r in o)a[o[r]]=r;for(var s in i)o[s]=i[s]}(t={exports:{}},t.exports),t.exports),a=(n.code,n.codes,n.aliases,n.names),s=(n.title,{"+":"plus","left command":"meta","right command":"meta"}),u={shift:1,ctrl:2,alt:3,meta:4};function c(e){var t=a[e]||"";for(var n in s)t=t.replace(n,s[n]);return t.replace(/\s/g,"")}function f(e,t){void 0===t&&(t=c(e.keyCode));var n=[e.shiftKey&&"shift",e.ctrlKey&&"ctrl",e.altKey&&"alt",e.metaKey&&"meta"];return-1===n.indexOf(t)&&n.push(t),n.filter(Boolean)}function y(e){var t=e.slice();return t.sort(function(e,t){return(u[e]||5)-(u[t]||5)}),t}var l=function(n){function e(e){void 0===e&&(e=window);var t=n.call(this)||this;return t.container=e,t.ctrlKey=!1,t.altKey=!1,t.shiftKey=!1,t.metaKey=!1,t.clear=function(){return t.ctrlKey=!1,t.altKey=!1,t.shiftKey=!1,t.metaKey=!1,t},t.keydownEvent=function(e){t.triggerEvent("keydown",e)},t.keyupEvent=function(e){t.triggerEvent("keyup",e)},r.addEvent(e,"blur",t.clear),r.addEvent(e,"keydown",t.keydownEvent),r.addEvent(e,"keyup",t.keyupEvent),t}!function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(e,n);var t=e.prototype;return Object.defineProperty(e,"global",{get:function(){return i=i||new e},enumerable:!0,configurable:!0}),e.setGlobal=function(){return this.global},t.destory=function(){var e=this.container;this.clear(),this.off(),r.removeEvent(e,"blur",this.clear),r.removeEvent(e,"keydown",this.keydownEvent),r.removeEvent(e,"keyup",this.keyupEvent)},t.keydown=function(e,t){return this.addEvent("keydown",e,t)},t.offKeydown=function(e,t){return this.removeEvent("keydown",e,t)},t.offKeyup=function(e,t){return this.removeEvent("keyup",e,t)},t.keyup=function(e,t){return this.addEvent("keyup",e,t)},t.addEvent=function(e,t,n){return r.isArray(t)?this.on(e+"."+y(t).join("."),n):r.isString(t)?this.on(e+"."+t,n):this.on(e,t),this},t.removeEvent=function(e,t,n){return r.isArray(t)?this.off(e+"."+y(t).join("."),n):r.isString(t)?this.off(e+"."+t,n):this.off(e,t),this},t.triggerEvent=function(e,t){this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey,this.altKey=t.altKey,this.metaKey=t.metaKey;var n=c(t.keyCode),r={key:n,isToggle:"ctrl"===n||"shift"===n||"meta"===n||"alt"===n,inputEvent:t,keyCode:t.keyCode,ctrlKey:t.ctrlKey,altKey:t.altKey,shiftKey:t.shiftKey,metaKey:t.metaKey};this.trigger(e,r),this.trigger(e+"."+n,r);var o=f(t,n);1<o.length&&this.trigger(e+"."+o.join("."),r)},e}(e);return l.getKey=c,l.getCombi=f,l});
//# sourceMappingURL=keycon.js.map
