"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Crud = undefined;

var _skyrocketEngine = require("skyrocket-engine");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crud = exports.Crud = function (_Component) {
    _inherits(Crud, _Component);

    function Crud(schema, store) {
        _classCallCheck(this, Crud);

        var _this = _possibleConstructorReturn(this, (Crud.__proto__ || Object.getPrototypeOf(Crud)).call(this));

        _this._schema = schema;

        var schemaName = _this._schema.name.toUpperCase();
        var networkObjectCreated = {};
        var networkObjectDeleted = {};
        var networkObjectUpdated = {};
        networkObjectCreated["SR_CRUD:NETWORK_" + schemaName + "_CREATED"] = function (event) {
            var action = {
                type: "SR_CRUD:CREATE_" + schemaName
            };
            action[schema.name] = event[schema.name];
            store.dispatch(action);
        };
        networkObjectUpdated["SR_CRUD:NETWORK_" + schemaName + "_UPDATED"] = function (event) {
            var action = {
                type: "SR_CRUD:UPDATE_" + schemaName
            };
            action[schema.name] = event[schema.name];
            store.dispatch(action);
        };
        networkObjectDeleted["SR_CRUD:NETWORK_" + schemaName + "_DELETED"] = function (event) {
            var action = {
                type: "SR_CRUD:DELETE_" + schemaName
            };
            action.id = event.id;
            store.dispatch(action);
        };

        _this.registerEventListeners(Object.assign({}, networkObjectCreated));
        _this.registerEventListeners(Object.assign({}, networkObjectUpdated));
        _this.registerEventListeners(Object.assign({}, networkObjectDeleted));
        return _this;
    }

    return Crud;
}(_skyrocketEngine.Component);