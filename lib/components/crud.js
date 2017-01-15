import { Component } from "skyrocket-engine";

export class Crud extends Component {
    constructor(schema) {
        super();
        this._schema = schema;

        const schemaName = this._schema.name.toUpperCase();
        const networkObjectCreated = {};
        const networkObjectDeleted = {};
        const networkObjectUpdated = {};
        networkObjectCreated[`SR_CRUD:NETWORK_${schemaName}_CREATED`] = () => {};
        networkObjectUpdated[`SR_CRUD:NETWORK_${schemaName}_UPDATED`] = () => {};
        networkObjectDeleted[`SR_CRUD:NETWORK_${schemaName}_DELETED`] = () => {};

        this.registerEventListeners(Object.assign({}, networkObjectCreated));
        this.registerEventListeners(Object.assign({}, networkObjectUpdated));
        this.registerEventListeners(Object.assign({}, networkObjectDeleted));
    }
}
