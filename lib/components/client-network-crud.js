import { NetworkComponent } from "skyrocket-engine";
import { TransformerFactory } from "skyrocket-engine";
import { assertValidNetworkCrudOptions } from "./utils";

export class ClientNetworkCrud extends NetworkComponent {
    constructor(schema, options = {}) {
        super();
        assertValidNetworkCrudOptions(options);

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
