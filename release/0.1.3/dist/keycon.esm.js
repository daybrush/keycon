/*
Copyright (c) 2019 Daybrush
name: keycon
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/keycon.git
version: 0.1.3
*/
import Component from '@egjs/component';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var keycode = createCommonjsModule(function (module, exports) {
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */
function keyCode(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
    if (hasKeyCode) searchInput = hasKeyCode;
  } // Numbers


  if ('number' === typeof searchInput) return names[searchInput]; // Everything else (cast to string)

  var search = String(searchInput); // check codes

  var foundNamedKey = codes[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey; // check aliases

  var foundNamedKey = aliases[search.toLowerCase()];
  if (foundNamedKey) return foundNamedKey; // weird character?

  if (search.length === 1) return search.charCodeAt(0);
  return undefined;
}
/**
 * Compares a keyboard event with a given keyCode or keyName.
 *
 * @param {Event} event Keyboard event that should be tested
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Boolean}
 * @api public
 */


keyCode.isEventKey = function isEventKey(event, nameOrCode) {
  if (event && 'object' === typeof event) {
    var keyCode = event.which || event.keyCode || event.charCode;

    if (keyCode === null || keyCode === undefined) {
      return false;
    }

    if (typeof nameOrCode === 'string') {
      // check codes
      var foundNamedKey = codes[nameOrCode.toLowerCase()];

      if (foundNamedKey) {
        return foundNamedKey === keyCode;
      } // check aliases


      var foundNamedKey = aliases[nameOrCode.toLowerCase()];

      if (foundNamedKey) {
        return foundNamedKey === keyCode;
      }
    } else if (typeof nameOrCode === 'number') {
      return nameOrCode === keyCode;
    }

    return false;
  }
};

exports = module.exports = keyCode;
/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222 // Helper aliases

};
var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'spacebar': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
  /*!
   * Programatically add the following
   */
  // lower case chars

};

for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32; // numbers


for (var i = 48; i < 58; i++) codes[i - 48] = i; // function keys


for (i = 1; i < 13; i++) codes['f' + i] = i + 111; // numpad keys


for (i = 0; i < 10; i++) codes['numpad ' + i] = i + 96;
/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */


var names = exports.names = exports.title = {}; // title for backward compat
// Create reverse mapping

for (i in codes) names[codes[i]] = i; // Add aliases


for (var alias in aliases) {
  codes[alias] = aliases[alias];
}
});
var keycode_1 = keycode.code;
var keycode_2 = keycode.codes;
var keycode_3 = keycode.aliases;
var keycode_4 = keycode.names;
var keycode_5 = keycode.title;

/*
Copyright (c) 2018 Daybrush
@name: @daybrush/utils
license: MIT
author: Daybrush
repository: https://github.com/daybrush/utils
@version 0.7.0
*/
/**
* get string "string"
* @memberof Consts
* @example
import {STRING} from "@daybrush/utils";

console.log(STRING); // "string"
*/

var STRING = "string";
/**
* Check the type that the value is string.
* @memberof Utils
* @param {string} value - Value to check the type
* @return {} true if the type is correct, false otherwise
* @example
import {isString} from "@daybrush/utils";

console.log(isString("1234")); // true
console.log(isString(undefined)); // false
console.log(isString(1)); // false
console.log(isString(null)); // false
*/


function isString(value) {
  return typeof value === STRING;
}

var codeData = {
  "+": "plus",
  "left command": "meta",
  "right command": "meta"
};

function getKey(keyCode) {
  var key = keycode_4[keyCode] || "";

  for (var name in codeData) {
    key = key.replace(name, codeData[name]);
  }

  return key.replace(/\s/g, "");
}

var KeyController =
/*#__PURE__*/
function (_super) {
  __extends(KeyController, _super);

  function KeyController(container) {
    if (container === void 0) {
      container = window;
    }

    var _this = _super.call(this) || this;

    _this.keydownEvent = function (e) {
      _this.triggerEvent("keydown", e);
    };

    _this.keyupEvent = function (e) {
      _this.triggerEvent("keyup", e);
    };

    container.addEventListener("keydown", _this.keydownEvent);
    container.addEventListener("keyup", _this.keyupEvent);
    return _this;
  }

  var __proto = KeyController.prototype;

  __proto.keydown = function (comb, callback) {
    if (isString(comb)) {
      return this.on("keydown." + comb, callback);
    } else {
      return this.on("keydown", comb);
    }
  };

  __proto.keyup = function (comb, callback) {
    if (typeof comb === "string") {
      return this.on("keyup." + comb, callback);
    } else {
      return this.on("keyup", comb);
    }
  };

  __proto.triggerEvent = function (type, e) {
    var key = getKey(e.keyCode);
    var param = {
      key: key,
      inputEvent: e,
      keyCode: e.keyCode,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey
    };
    this.trigger(type, param);
    this.trigger(type + "." + key, param);
  };

  return KeyController;
}(Component);
function keycon(container) {
  return new KeyController(container);
}

export default keycon;
export { KeyController };
//# sourceMappingURL=keycon.esm.js.map
