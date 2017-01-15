import * as Skyrocket from "skyrocket-engine";

export class KeyboardInput extends Skyrocket.Component {
    constructor() {
        super();
        this.pressedKeys = {};

        document.onkeydown = evt => {
            if (!this.pressedKeys[evt.keyCode]) {
                this.emit({
                    type: "SR_KEYBOARD:PRESSED",
                    keyCode: evt.keyCode
                });
                this.pressedKeys[evt.keyCode] = true;
            }
        };

        document.onkeyup = evt => {
            if (this.pressedKeys[evt.keyCode]) {
                this.emit({
                    type: "SR_KEYBOARD:RELEASED",
                    keyCode: evt.keyCode
                });
                this.pressedKeys[evt.keyCode] = false;
            }
        };
    }
}
