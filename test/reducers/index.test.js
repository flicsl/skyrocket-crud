import { createReducer } from "../../lib";
import { expect } from "chai";

const schema = {
    name: "player",
    network: {
        id: {binaryFormat: "uint8"},
        x: {binaryFormat: "uint16"},
        y: {binaryFormat: "uint16"}
    }
};

describe("Reducers", () => {
    let reducer;

    beforeEach(() => {
        reducer = createReducer(schema);
    });

    it("should add schema object to state", () => {
        const action = {
            type: "SR_CRUD:CREATE_PLAYER",
            player: {
                id: 12,
                x: 20011,
                y: 31010
            }
        };
        const reduced = reducer(undefined, action);
        expect(Object.keys(reduced).length).to.equal(1);
        expect(reduced[action.player.id]).to.eql(action.player);
    });

    it("should update schema object", () => {
        const state = {
            12: {
                id: 12,
                x: 20011,
                y: 31010
            }
        };
        const action = {
            type: "SR_CRUD:UPDATE_PLAYER",
            player: {
                id: 12,
                x: 40111
            }
        };
        const reduced = reducer(state, action);
        expect(Object.keys(reduced).length).to.equal(Object.keys(state).length);
        expect(reduced[12].x).to.eql(action.player.x);
        expect(reduced[12].y).to.eql(state[12].y);
    });

    it("should delete schema object from state", () => {
        const state = {
            12: {
                id: 12,
                x: 20191,
                y: 60111
            }
        };
        const action = {
            type: "SR_CRUD:DELETE_PLAYER",
            id: 12
        };
        const reduced = reducer(state, action)
        expect(Object.keys(reduced).length).to.equal(0);
        expect(reduced[12]).to.be.not.ok;
    });
});
