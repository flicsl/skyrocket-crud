import { Component } from "skyrocket-engine";

export class Crud extends Component {
    constructor(schema, store) {
        super();
        this._schema = schema;

        const schemaName = this._schema.name.toUpperCase();
        const networkObjectCreated = {};
        const networkObjectDeleted = {};
        const networkObjectUpdated = {};
        networkObjectCreated[`SR_CRUD:NETWORK_${schemaName}_CREATED`] = (event) => {
            const action = {
                type: `SR_CRUD:CREATE_${schemaName}`
            };
            action[schema.name] = event[schema.name];
            store.dispatch(action);
        };
        networkObjectUpdated[`SR_CRUD:NETWORK_${schemaName}_UPDATED`] = (event) => {
            const action = {
                type: `SR_CRUD:UPDATE_${schemaName}`
            };
            action[schema.name] = event[schema.name];
            store.dispatch(action);
        };
        networkObjectDeleted[`SR_CRUD:NETWORK_${schemaName}_DELETED`] = (event) => {
            const action = {
                type: `SR_CRUD:DELETE_${schemaName}`
            };
            action.id = event.id;
            store.dispatch(action);
        };

        this.registerEventListeners(Object.assign({}, networkObjectCreated));
        this.registerEventListeners(Object.assign({}, networkObjectUpdated));
        this.registerEventListeners(Object.assign({}, networkObjectDeleted));
    }
}
