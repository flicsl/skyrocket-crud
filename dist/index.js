"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createReducer = exports.Components = undefined;

var _components = require("./components");

var Components = _interopRequireWildcard(_components);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Components = Components;
exports.createReducer = _reducers2.default;