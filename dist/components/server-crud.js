"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServerCrud = undefined;

var _crud = require("./crud");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerCrud = exports.ServerCrud = function (_Crud) {
    _inherits(ServerCrud, _Crud);

    function ServerCrud(schema, store, network) {
        _classCallCheck(this, ServerCrud);

        var _this = _possibleConstructorReturn(this, (ServerCrud.__proto__ || Object.getPrototypeOf(ServerCrud)).call(this, schema, store));

        var schemaName = schema.name.toUpperCase();
        var createHandler = _this.getEventHandler({ type: "SR_CRUD:NETWORK_" + schemaName + "_CREATED" });
        var combinedCreateHandler = {};
        combinedCreateHandler["SR_CRUD:NETWORK_" + schemaName + "_CREATED"] = combine(createHandler, function (event) {
            var obj = {
                type: "SR_CRUD:NOTIFY_" + schemaName + "_CREATED"
            };
            obj[schema.name] = event[schema.name];
            network.fire(obj);
        });

        var updateHandler = _this.getEventHandler({ type: "SR_CRUD:NETWORK_" + schemaName + "_UPDATED" });
        var combinedUpdateHandler = {};
        combinedUpdateHandler["SR_CRUD:NETWORK_" + schemaName + "_UPDATED"] = combine(updateHandler, function (event) {
            var obj = {
                type: "SR_CRUD:NOTIFY_" + schemaName + "_UPDATED"
            };
            obj[schema.name] = event[schema.name];
            network.fire(obj);
        });

        var deleteHandler = _this.getEventHandler({ type: "SR_CRUD:NETWORK_" + schemaName + "_DELETED" });
        var combinedDeleteHandler = {};
        combinedUpdateHandler["SR_CRUD:NETWORK_" + schemaName + "_DELETED"] = combine(deleteHandler, function (event) {
            network.fire({
                id: event.id,
                type: "SR_CRUD:NOTIFY_" + schemaName + "_DELETED"
            });
        });

        _this.registerEventListeners(combinedCreateHandler);
        _this.registerEventListeners(combinedUpdateHandler);
        _this.registerEventListeners(combinedDeleteHandler);
        return _this;
    }

    return ServerCrud;
}(_crud.Crud);

function combine(fn1, fn2) {
    return function () {
        var output = fn1.apply(undefined, arguments);
        return output ? output : fn2.apply(undefined, arguments);
    };
}