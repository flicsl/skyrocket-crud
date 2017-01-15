import { Component, TransformerFactory, BufferUtils } from "skyrocket-engine";
import { ClientNetworkCrud } from "../../lib/components";
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

describe("ClientNetworkCrud", () => {
    let component;
    let transformer;
    const options = {
        messageCreated: 1,
        messageUpdated: 2,
        messageDeleted: 3
    };

    beforeEach(() => {
        component = new ClientNetworkCrud(schema, options);
        transformer = TransformerFactory.create(schema);
    });

    it("should fire SR_CRUD:NETWORK_<schema>_CREATED on messageCreated", () => {
        const parent = new Component();
        parent.addChild(component);

        const callback = spy();
        const obj = {
            id: 221,
            x: 44411,
            y: 11200
        };
        parent.registerEventListeners({
            "SR_CRUD:NETWORK_PLAYER_CREATED": callback
        });

        const message = BufferUtils.concat(new Uint8Array([0]), transformer.encode(obj));
        component.getMessageHandler(options.messageCreated)(message);

        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NETWORK_PLAYER_CREATED",
            player: obj
        });
    });

    it("should fire SR_CRUD:NETWORK_<schema>_UPDATED on messageUpdated", () => {
        const parent = new Component();
        parent.addChild(component);

        const callback = spy();
        const obj = {
            id: 221,
            x: 44411,
            y: 11200
        };
        parent.registerEventListeners({
            "SR_CRUD:NETWORK_PLAYER_UPDATED": callback
        });

        const message = BufferUtils.concat(new Uint8Array([0]), transformer.encode(obj));
        component.getMessageHandler(options.messageUpdated)(message);

        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NETWORK_PLAYER_UPDATED",
            player: obj
        });
    });

    it("should fire SR_CRUD:NETWORK_<schema>_DELETED on messageDeleted", () => {
        const parent = new Component();
        parent.addChild(component);

        const callback = spy();
        const id = 254;
        parent.registerEventListeners({
            "SR_CRUD:NETWORK_PLAYER_DELETED": callback
        });

        const message = BufferUtils.concat(new Uint8Array([0]), transformer.encodeAttribute("id", id));
        component.getMessageHandler(options.messageDeleted)(message);

        expect(callback).to.have.been.calledWith({
            type: "SR_CRUD:NETWORK_PLAYER_DELETED",
            id
        });
    });
});
