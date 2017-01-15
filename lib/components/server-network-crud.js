import { BufferUtils, NetworkComponent, TransformerFactory } from "skyrocket-engine";
import { assertValidNetworkCrudOptions } from "./utils";

export class ServerNetworkCrud extends NetworkComponent {
    constructor(schema, options = {}) {
        super();
        assertValidNetworkCrudOptions(options);
        if (!options.sendToAll) {
            throw new Error("options.sendToAll is not a function!");
        }

        const _transformer = TransformerFactory.create(schema);
        const schemaName = schema.name.toUpperCase();

        const notifySchemaCreated = {};
        notifySchemaCreated[`SR_CRUD:NOTIFY_${schemaName}_CREATED`] = function(event) {
            const message = BufferUtils.concat(BufferUtils.toUint8(options.messageCreated), _transformer.encode(event[schema.name]));
            options.sendToAll(message);
        };
        const notifySchemaUpdated = {};
        notifySchemaUpdated[`SR_CRUD:NOTIFY_${schemaName}_UPDATED`] = function(event) {
            const message = BufferUtils.concat(BufferUtils.toUint8(options.messageUpdated), _transformer.encode(event[schema.name]));
            options.sendToAll(message);
        };
        const notifySchemaDeleted = {};
        notifySchemaDeleted[`SR_CRUD:NOTIFY_${schemaName}_DELETED`] = function(event) {
            const message = BufferUtils.concat(BufferUtils.toUint8(options.messageDeleted), _transformer.encodeAttribute("id", event.id));
            options.sendToAll(message);
        };
        this.registerEventListeners(Object.assign({}, notifySchemaCreated, notifySchemaUpdated, notifySchemaDeleted));
    }
}
