import { Component } from "skyrocket-engine";

export class NetworkComponent extends Component {
    constructor() {
        super();
        this._messageHandlers = {};
    }

    registerMessageHandlers(handlers) {
        this._messageHandlers = Object.assign({}, handlers);
    }

    getMessageHandler(messageId) {
        return this._messageHandlers[messageId];
    }
}
