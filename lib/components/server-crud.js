import { Crud } from "./crud";

export class ServerCrud extends Crud {
    constructor(schema, store, network) {
        super(schema, store);

        const schemaName = schema.name.toUpperCase();
        const createHandler = this.getEventHandler({type: `SR_CRUD:NETWORK_${schemaName}_CREATED`});
        const combinedCreateHandler = {};
        combinedCreateHandler[`SR_CRUD:NETWORK_${schemaName}_CREATED`] = combine(createHandler, event => {
            const obj = {
                type: `SR_CRUD:NOTIFY_${schemaName}_CREATED`
            };
            obj[schema.name] = event[schema.name];
            network.fire(obj);
        });

        const updateHandler = this.getEventHandler({type: `SR_CRUD:NETWORK_${schemaName}_UPDATED`});
        const combinedUpdateHandler = {};
        combinedUpdateHandler[`SR_CRUD:NETWORK_${schemaName}_UPDATED`] = combine(updateHandler, event => {
            const obj = {
                type: `SR_CRUD:NOTIFY_${schemaName}_UPDATED`
            };
            obj[schema.name] = event[schema.name];
            network.fire(obj);
        });

        const deleteHandler = this.getEventHandler({type: `SR_CRUD:NETWORK_${schemaName}_DELETED`});
        const combinedDeleteHandler = {};
        combinedUpdateHandler[`SR_CRUD:NETWORK_${schemaName}_DELETED`] = combine(deleteHandler, event => {
            network.fire({
                id: event.id,
                type: `SR_CRUD:NOTIFY_${schemaName}_DELETED`
            });
        });

        this.registerEventListeners(combinedCreateHandler);
        this.registerEventListeners(combinedUpdateHandler);
        this.registerEventListeners(combinedDeleteHandler);
    }
}

function combine(fn1, fn2) {
    return function() {
        const output = fn1(...arguments);
        return output ? output : fn2(...arguments);
    };
}
