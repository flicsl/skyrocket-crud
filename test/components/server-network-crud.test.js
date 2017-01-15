import { Component, TransformerFactory, BufferUtils } from "skyrocket-engine";
import { ServerNetworkCrud } from "../../lib/components";
import { expect } from "chai";
import { spy } from "sinon";

const schema = {
    name: "player",
    network: {
        id: {binaryFormat: "uint8"},
        x: {binaryFormat: "uint16"},
        y: {binaryFormat: "uint16"}
    }
};

describe("ServerNetworkCrud", () => {
    let component;
    let player;
    let options;
    let transformer;

    beforeEach(() => {
        player = {
            id: 211,
            x: 91101,
            y: 2011
        };
        transformer = TransformerFactory.create(schema);
        options = {
            messageCreated: 1,
            messageUpdated: 2,
            messageDeleted: 3,
            sendToAll: spy()
        };
        component = new ServerNetworkCrud(schema, options);
    });

    it("should send message when receiving SR_CRUD:NOTIFY_<schema>_CREATED", () => {
        const message = BufferUtils.concat(BufferUtils.toUint8(options.messageCreated), transformer.encode(player));
        const evt = {
            type: "SR_CRUD:NOTIFY_PLAYER_CREATED",
            player
        };
        component.fire(evt);
        expect(options.sendToAll).to.have.been.calledWith(message);
    });

    it("should send message when receiving SR_CRUD:NOTIFY_<schema>_UPDATED", () => {
        const message = BufferUtils.concat(BufferUtils.toUint8(options.messageUpdated), transformer.encode(player));
        const evt = {
            type: "SR_CRUD:NOTIFY_PLAYER_UPDATED",
            player
        };
        component.fire(evt);
        expect(options.sendToAll).to.have.been.calledWith(message);
    });

    it("should send message when receiving SR_CRUD:NOTIFY_<schema>_DELETED", () => {
        const message = BufferUtils.concat(BufferUtils.toUint8(options.messageDeleted), transformer.encodeAttribute("id", player));
        const evt = {
            type: "SR_CRUD:NOTIFY_PLAYER_DELETED",
            id: player.id
        };
        component.fire(evt);
        expect(options.sendToAll).to.have.been.calledWith(message);
    });
});
