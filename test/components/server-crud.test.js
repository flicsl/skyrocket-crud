import { expect } from "chai";
import { spy } from "sinon";
import { ServerCrud } from "../../lib/components";
import { Component } from "skyrocket-engine";

const schema = {
    name: "player",
    network: {
        id: {binaryFormat: "uint8"},
        x: {binaryFormat: "uint16"},
        y: {binaryFormat: "uint16"}
    }
};

describe("ServerCrud", () => {
    let store;
    let component;
    let network;
    let player;

    beforeEach(() => {
        store = {dispatch: spy()};
        network = new Component();
        network.registerEventListeners({
            "SR_CRUD:NOTIFY_PLAYER_CREATED": spy(),
            "SR_CRUD:NOTIFY_PLAYER_UPDATED": spy(),
            "SR_CRUD:NOTIFY_PLAYER_DELETED": spy()
        });
        component = new ServerCrud(schema, store, network);
        player = {
            id: 96,
            x: 2011,
            y: 9912
        };
    });

    it("should notify network when schema object gets created", () => {
        const callback = network.getEventHandler({type: "SR_CRUD:NOTIFY_PLAYER_CREATED"});
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_CREATED", player});
        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NOTIFY_PLAYER_CREATED",
            player 
        });
    });

    it("should notify network when schema object gets updated", () => {
        const callback = network.getEventHandler({type: "SR_CRUD:NOTIFY_PLAYER_UPDATED"});
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_UPDATED", player});
        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NOTIFY_PLAYER_UPDATED",
            player 
        });
    });

    it("should notify network when schema object gets deleted", () => {
        const callback = network.getEventHandler({type: "SR_CRUD:NOTIFY_PLAYER_DELETED"});
        component.fire({type: "SR_CRUD:NETWORK_PLAYER_DELETED", id: player.id});
        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NOTIFY_PLAYER_DELETED",
            id: player.id
        });
    });
});
