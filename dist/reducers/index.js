"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createReducer;
function createReducer(schema) {
    var schemaName = schema.name.toUpperCase();

    function crud(state, action) {
        var obj = {};
        switch (action.type) {
            case "SR_CRUD:CREATE_" + schemaName:
                obj[action[schema.name].id] = action[schema.name];
                return Object.assign({}, obj);
            case "SR_CRUD:UPDATE_" + schemaName:
                obj[action[schema.name].id] = Object.assign({}, state, action[schema.name]);
                return Object.assign({}, obj);
        }
    }

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        switch (action.type) {
            case "SR_CRUD:CREATE_" + schemaName:
                return Object.assign({}, state, crud(undefined, action));
            case "SR_CRUD:UPDATE_" + schemaName:
                return Object.assign({}, state, crud(state[action[schema.name].id], action));
            case "SR_CRUD:DELETE_" + schemaName:
                delete state[action.id];
                return Object.assign({}, state);
        }
    };
}