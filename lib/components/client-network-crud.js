import { NetworkComponent } from "./network-component";
import { TransformerFactory } from "skyrocket-engine";

export class ClientNetworkCrud extends NetworkComponent {
    constructor(schema, options = {}) {
        super();
        if (options.messageCreated == null)
            throw new Error("No 'messageCreated' found in options.");
        if (options.messageUpdated == null)
            throw new Error("No 'messageUpdated' found in options.");
        if (options.messageDeleted == null)
            throw new Error("No 'messageDeleted' found in options.");

        this._transformer = TransformerFactory.create(schema);
        const schemaName = schema.name.toUpperCase();
        const createdHandler = {};
        createdHandler[options.messageCreated] = (message) => {
            const obj = this._transformer.decode(message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_CREATED`
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        const updatedHandler = {};
        updatedHandler[options.messageUpdated] = (message) => {
            const obj = this._transformer.decode(message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_UPDATED`
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        const deletedHandler = {};
        deletedHandler[options.messageDeleted] = (message) => {
            const id = this._transformer.decodeAttribute("id", message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_DELETED`,
                id
            };
            this.emit(evt);
        };

        createdHandler[options.messageUpdated]
        this.registerMessageHandlers(Object.assign({}, createdHandler, updatedHandler, deletedHandler));
    }
}
