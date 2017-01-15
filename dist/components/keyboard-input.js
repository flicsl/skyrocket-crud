"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyboardInput = undefined;

var _skyrocketEngine = require("skyrocket-engine");

var Skyrocket = _interopRequireWildcard(_skyrocketEngine);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardInput = exports.KeyboardInput = function (_Skyrocket$Component) {
    _inherits(KeyboardInput, _Skyrocket$Component);

    function KeyboardInput() {
        _classCallCheck(this, KeyboardInput);

        var _this = _possibleConstructorReturn(this, (KeyboardInput.__proto__ || Object.getPrototypeOf(KeyboardInput)).call(this));

        _this.pressedKeys = {};

        document.onkeydown = function (evt) {
            if (!_this.pressedKeys[evt.keyCode]) {
                _this.emit({
                    type: "SR_KEYBOARD:PRESSED",
                    keyCode: evt.keyCode
                });
                _this.pressedKeys[evt.keyCode] = true;
            }
        };

        document.onkeyup = function (evt) {
            if (_this.pressedKeys[evt.keyCode]) {
                _this.emit({
                    type: "SR_KEYBOARD:RELEASED",
                    keyCode: evt.keyCode
                });
                _this.pressedKeys[evt.keyCode] = false;
            }
        };
        return _this;
    }

    return KeyboardInput;
}(Skyrocket.Component);