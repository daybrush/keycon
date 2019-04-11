/*
Copyright (c) 2019 Daybrush
name: keycon
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/keycon.git
version: 0.0.1
*/
import Component from '@egjs/component';
import { names } from 'keycode';

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

var codeData = {
  "+": "plus",
  "left command": "meta",
  "right command": "meta"
};

function getKey(keyCode) {
  var key = names[keyCode] || "";

  for (var name in codeData) {
    key = key.replace(name, codeData[name]);
  }

  return key.replace(/\s/g, "");
}

var KeyController =
/*#__PURE__*/
function (_super) {
  __extends(KeyController, _super);

  function KeyController() {
    var _this = _super.call(this) || this;

    _this.keydownEvent = function (e) {
      _this.triggerEvent("keydown", e);
    };

    _this.keyupEvent = function (e) {
      _this.triggerEvent("keyup", e);
    };

    window.addEventListener("keydown", _this.keydownEvent);
    window.addEventListener("keyup", _this.keyupEvent);
    return _this;
  }

  var __proto = KeyController.prototype;

  __proto.keydown = function (comb, callback) {
    return this.on("keydown." + comb, callback);
  };

  __proto.keyup = function (comb, callback) {
    return this.on("keyup." + comb, callback);
  };

  __proto.triggerEvent = function (type, e) {
    var key = getKey(e.keyCode);
    this.trigger(type + "." + key, {
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey
    });
  };

  return KeyController;
}(Component);

function keycon() {
  return new KeyController();
}

export default keycon;
//# sourceMappingURL=keycon.esm.js.map
