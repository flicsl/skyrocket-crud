"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientNetworkCrud = undefined;

var _skyrocketEngine = require("skyrocket-engine");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClientNetworkCrud = exports.ClientNetworkCrud = function (_NetworkComponent) {
    _inherits(ClientNetworkCrud, _NetworkComponent);

    function ClientNetworkCrud(schema) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, ClientNetworkCrud);

        var _this = _possibleConstructorReturn(this, (ClientNetworkCrud.__proto__ || Object.getPrototypeOf(ClientNetworkCrud)).call(this));

        (0, _utils.assertValidNetworkCrudOptions)(options);

        _this._transformer = _skyrocketEngine.TransformerFactory.create(schema);
        var schemaName = schema.name.toUpperCase();
        var createdHandler = {};
        createdHandler[options.messageCreated] = function (message) {
            var obj = this._transformer.decode(message, 1);
            var evt = {
                type: "SR_CRUD:NETWORK_" + schemaName + "_CREATED"
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        var updatedHandler = {};
        updatedHandler[options.messageUpdated] = function (message) {
            var obj = this._transformer.decode(message, 1);
            var evt = {
                type: "SR_CRUD:NETWORK_" + schemaName + "_UPDATED"
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        var deletedHandler = {};
        deletedHandler[options.messageDeleted] = function (message) {
            var id = this._transformer.decodeAttribute("id", message, 1);
            var evt = {
                type: "SR_CRUD:NETWORK_" + schemaName + "_DELETED",
                id: id
            };
            this.emit(evt);
        };

        _this.registerMessageHandlers(Object.assign({}, createdHandler, updatedHandler, deletedHandler));
        return _this;
    }

    return ClientNetworkCrud;
}(_skyrocketEngine.NetworkComponent);