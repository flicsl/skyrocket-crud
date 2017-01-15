"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServerNetworkCrud = undefined;

var _skyrocketEngine = require("skyrocket-engine");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerNetworkCrud = exports.ServerNetworkCrud = function (_NetworkComponent) {
    _inherits(ServerNetworkCrud, _NetworkComponent);

    function ServerNetworkCrud(schema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, ServerNetworkCrud);

        var _this = _possibleConstructorReturn(this, (ServerNetworkCrud.__proto__ || Object.getPrototypeOf(ServerNetworkCrud)).call(this));

        (0, _utils.assertValidNetworkCrudOptions)(options);
        if (!options.sendToAll) {
            throw new Error("options.sendToAll is not a function!");
        }

        _this._transformer = _skyrocketEngine.TransformerFactory.create(schema);
        var schemaName = schema.name.toUpperCase();

        var notifySchemaCreated = {};
        notifySchemaCreated["SR_CRUD:NOTIFY_" + schemaName + "_CREATED"] = function (event) {
            var message = _skyrocketEngine.BufferUtils.concat(_skyrocketEngine.BufferUtils.toUint8(options.messageCreated), this._transformer.encode(event[schema.name]));
            options.sendToAll(message);
        };
        var notifySchemaUpdated = {};
        notifySchemaUpdated["SR_CRUD:NOTIFY_" + schemaName + "_UPDATED"] = function (event) {
            var message = _skyrocketEngine.BufferUtils.concat(_skyrocketEngine.BufferUtils.toUint8(options.messageUpdated), this._transformer.encode(event[schema.name]));
            options.sendToAll(message);
        };
        var notifySchemaDeleted = {};
        notifySchemaDeleted["SR_CRUD:NOTIFY_" + schemaName + "_DELETED"] = function (event) {
            var message = _skyrocketEngine.BufferUtils.concat(_skyrocketEngine.BufferUtils.toUint8(options.messageDeleted), this._transformer.encodeAttribute("id", event.id));
            options.sendToAll(message);
        };
        _this.registerEventListeners(Object.assign({}, notifySchemaCreated, notifySchemaUpdated, notifySchemaDeleted));
        return _this;
    }

    return ServerNetworkCrud;
}(_skyrocketEngine.NetworkComponent);