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
    let store;
    let component;
    let player;

    beforeEach(() => {
        store = {
            dispatch: spy()
        };
        component = new ClientCrud(schema, store);
        player = {
            id: 208,
            x: 9211,
            y: 2101
        };
    });

    it("should listen for SR_CRUD:NETWORK_<schema>_CREATED", () => {
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_CREATED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_CREATED", player});
        expect(handler).to.have.been.called;
        expect(store.dispatch).to.have.been.calledWith({
            type: "SR_CRUD:CREATE_PLAYER",
            player 
        });
    });

    it("should listen for SR_CRUD:NETWORK_<schema>_UPDATED", () => {
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_UPDATED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_UPDATED", player});
        expect(handler).to.have.been.called;
        expect(store.dispatch).to.have.been.calledWith({
            type: "SR_CRUD:UPDATE_PLAYER",
            player
        });
    });

    it("should listen for SR_CRUD:NETWORK_<schema>_DELETED", () => {
        const handler = spy(component._eventListeners, "SR_CRUD:NETWORK_PLAYER_DELETED");
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_DELETED", id: player.id});
        expect(handler).to.have.been.called;
        expect(store.dispatch).to.have.been.calledWith({
            type: "SR_CRUD:DELETE_PLAYER",
            id: player.id
        });
    });
});
