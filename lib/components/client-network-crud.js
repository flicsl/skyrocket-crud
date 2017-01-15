import { NetworkComponent } from "skyrocket-engine";
import { TransformerFactory } from "skyrocket-engine";
import { assertValidNetworkCrudOptions } from "./utils";

export class ClientNetworkCrud extends NetworkComponent {
    constructor(schema, options = {}) {
        super();
        assertValidNetworkCrudOptions(options);

        const _transformer = TransformerFactory.create(schema);
        const schemaName = schema.name.toUpperCase();
        const createdHandler = {};
        createdHandler[options.messageCreated] = function(message) {
            const obj = _transformer.decode(message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_CREATED`
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        const updatedHandler = {};
        updatedHandler[options.messageUpdated] = function(message) {
            const obj = _transformer.decode(message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_UPDATED`
            };
            evt[schema.name] = obj;
            this.emit(evt);
        };
        const deletedHandler = {};
        deletedHandler[options.messageDeleted] = function(message) {
            const id = _transformer.decodeAttribute("id", message, 1);
            const evt = {
                type: `SR_CRUD:NETWORK_${schemaName}_DELETED`,
                id
            };
            this.emit(evt);
        };

        this.registerMessageHandlers(Object.assign({}, createdHandler, updatedHandler, deletedHandler));
    }
}
