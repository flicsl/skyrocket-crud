import { expect } from "chai";
import { spy } from "sinon";
import { ClientCrud } from "../../lib/components";

const schema = {
    name: "player",
    network: {
        id: {binaryFormat: "uint8"},
        x: {binaryFormat: "uint16"},
        y: {binaryFormat: "uint16"}
    }
};

describe("ClientCrud", () => {
    it("should listen for SR_CRUD:NETWORK_<schema>_CREATED", () => {
        const component = new ClientCrud(schema);
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_CREATED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_CREATED"});
        expect(handler).to.have.been.called;
    });

    it("should listen for SR_CRUD:NETWORK_<schema>_UPDATED", () => {
        const component = new ClientCrud(schema);
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_UPDATED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_UPDATED"});
        expect(handler).to.have.been.called;
    });

    it("should listen for SR_CRUD:NETWORK_<schema>_DELETED", () => {
        const component = new ClientCrud(schema);
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_DELETED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_DELETED"});
        expect(handler).to.have.been.called;
    });
});
