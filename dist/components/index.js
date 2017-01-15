"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServerCrud = exports.ClientCrud = exports.ServerNetworkCrud = exports.ClientNetworkCrud = undefined;

var _clientNetworkCrud = require("./client-network-crud");

var _serverNetworkCrud = require("./server-network-crud");

var _clientCrud = require("./client-crud");

var _serverCrud = require("./server-crud");

exports.ClientNetworkCrud = _clientNetworkCrud.ClientNetworkCrud;
exports.ServerNetworkCrud = _serverNetworkCrud.ServerNetworkCrud;
exports.ClientCrud = _clientCrud.ClientCrud;
exports.ServerCrud = _serverCrud.ServerCrud;