import { Crud } from "./crud";

export class ServerCrud extends Crud {
    constructor(schema, store) {
        super(schema, store);
    }
}
