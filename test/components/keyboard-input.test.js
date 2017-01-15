import { KeyboardInput } from "../../lib/components";
import { expect } from "chai";
import { spy } from "sinon";
import { Component } from "skyrocket-engine";
const jsdom = require("mocha-jsdom");

describe("KeyboardInput", () => {
    jsdom();

    it("should emit SR_KEYBOARD:PRESSED with proper keycode", () => {
        const keyCode = 128;
        const parent = new Component();
        const callback = spy();
        parent.registerEventListeners({"SR_KEYBOARD:PRESSED": callback});
        parent.addChild(new KeyboardInput());
        document.onkeydown({keyCode});
        expect(callback).to.have.been.calledWith({
            type: "SR_KEYBOARD:PRESSED",
            keyCode
        });
    });

    it("should emit SR_KEYBOARD:RELEASED with proper keycode", () => {
        const keyCode = 244;
        const parent = new Component();
        const callback = spy();
        parent.registerEventListeners({"SR_KEYBOARD:RELEASED": callback});
        parent.addChild(new KeyboardInput());
        document.onkeydown({keyCode});
        document.onkeyup({keyCode});
        expect(callback).to.have.been.calledWith({
            type: "SR_KEYBOARD:RELEASED",
            keyCode
        });
    });
});
