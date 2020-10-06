"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const Events_1 = require("../../types/Events");
class BaseStore extends pieces_1.Store {
    constructor(client, Ctor, options) {
        super(Ctor, {
            onError: (error) => client.emit(Events_1.Events.Error, error),
            onUnload: (store, piece) => client.emit(Events_1.Events.PieceUnload, store, piece),
            onPostLoad: (store, piece) => client.emit(Events_1.Events.PiecePostLoad, store, piece),
            ...options
        });
        this.client = client;
    }
    get extras() {
        return { ...super.extras, client: this.client };
    }
}
exports.BaseStore = BaseStore;
//# sourceMappingURL=BaseStore.js.map