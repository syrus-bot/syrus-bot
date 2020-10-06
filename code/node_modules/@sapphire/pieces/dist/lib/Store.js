"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const collection_1 = __importDefault(require("@discordjs/collection"));
const fs_1 = require("fs");
const path_1 = require("path");
const LoaderError_1 = require("./errors/LoaderError");
const LoadJavaScript_1 = require("./strategies/filters/LoadJavaScript");
const LoadSingle_1 = require("./strategies/loaders/LoadSingle");
/**
 * The store class which contains [[Piece]]s.
 */
class Store extends collection_1.default {
    /**
     * @param constructor The piece constructor this store loads.
     * @param options The options for the store.
     */
    constructor(constructor, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        super();
        Object.defineProperty(this, "Constructor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "paths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filterHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "preloadHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "loadHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onPostLoad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onUnload", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.Constructor = constructor;
        this.name = options.name;
        this.paths = new Set((_a = options.paths) !== null && _a !== void 0 ? _a : []);
        this.filterHook = (_b = options.filterHook) !== null && _b !== void 0 ? _b : LoadJavaScript_1.LoadJavaScript.getNameData.bind(LoadJavaScript_1.LoadJavaScript);
        this.preloadHook = (_c = options.preloadHook) !== null && _c !== void 0 ? _c : ((path) => Promise.resolve().then(() => __importStar(require(path))));
        this.loadHook = (_d = options.loadHook) !== null && _d !== void 0 ? _d : LoadSingle_1.LoadSingle.load.bind(LoadSingle_1.LoadSingle);
        this.onPostLoad = (_e = options.onPostLoad) !== null && _e !== void 0 ? _e : (() => void 0);
        this.onUnload = (_f = options.onUnload) !== null && _f !== void 0 ? _f : (() => void 0);
        this.onError = (_g = options.onError) !== null && _g !== void 0 ? _g : ((error) => console.error(error));
    }
    /**
     * Registers a directory into the store.
     * @param path The path to be added.
     * @example
     * ```typescript
     * store
     *   .registerPath(resolve('commands'))
     *   .registerPath(resolve('third-party', 'commands'));
     * ```
     */
    registerPath(path) {
        this.paths.add(path);
        return this;
    }
    /**
     * Loads a piece or more from a path.
     * @param path The path of the file to load.
     * @return An async iterator that yields each one of the loaded pieces.
     */
    async *load(path) {
        const data = this.filterHook(path);
        if (data === null)
            return;
        for await (const Ctor of this.loadHook(this, path)) {
            yield await this.insert(this.construct(Ctor, path, data.name));
        }
    }
    /**
     * Unloads a piece given its instance or its name.
     * @param name The name of the file to load.
     * @return Returns the piece that was unloaded.
     */
    async unload(name) {
        const piece = this.resolve(name);
        this.delete(piece.name);
        this.onUnload(this, piece);
        await piece.onUnload();
        return piece;
    }
    /**
     * Loads all pieces from all directories specified by [[paths]].
     */
    async loadAll() {
        const pieces = [];
        for (const path of this.paths) {
            for await (const piece of this.loadPath(path)) {
                pieces.push(piece);
            }
        }
        this.clear();
        for (const piece of pieces) {
            await this.insert(piece);
        }
    }
    /**
     * Resolves a piece by its name or its instance.
     * @param name The name of the piece or the instance itself.
     * @return The resolved piece.
     */
    resolve(name) {
        if (typeof name === 'string') {
            const result = this.get(name);
            if (typeof result === 'undefined')
                throw new LoaderError_1.LoaderError("UNLOADED_PIECE" /* UnloadedPiece */, `The piece '${name}' does not exist.`);
            return result;
        }
        if (name instanceof this.Constructor)
            return name;
        throw new LoaderError_1.LoaderError("INCORRECT_TYPE" /* IncorrectType */, `The piece '${name.name}' is not an instance of '${this.Constructor.name}'.`);
    }
    /**
     * The extras to be passed to the constructor of all pieces.
     */
    get extras() {
        return {};
    }
    /**
     * Inserts a piece into the store.
     * @param piece The piece to be inserted into the store.
     * @return The inserted piece.
     */
    async insert(piece) {
        if (!piece.enabled)
            return piece;
        this.set(piece.name, piece);
        this.onPostLoad(this, piece);
        await piece.onLoad();
        return piece;
    }
    /**
     * Constructs a [[Piece]] instance.
     * @param Ctor The [[Piece]]'s constructor used to build the instance.
     * @param path The path of the file.
     * @param name The name of the piece.
     */
    construct(Ctor, path, name) {
        return new Ctor({ extras: this.extras, store: this, path, name }, { name, enabled: true });
    }
    /**
     * Loads a directory into the store.
     * @param directory The directory to load the pieces from.
     * @return An async iterator that yields the pieces to be loaded into the store.
     */
    async *loadPath(directory) {
        for await (const child of this.walk(directory)) {
            const data = this.filterHook(child);
            if (data === null)
                continue;
            try {
                for await (const Ctor of this.loadHook(this, child)) {
                    yield this.construct(Ctor, child, data.name);
                }
            }
            catch (error) {
                this.onError(error, child);
            }
        }
    }
    /**
     * Retrieves all possible pieces.
     * @param path The directory to load the pieces from.
     * @return An async iterator that yields the modules to be processed and loaded into the store.
     */
    async *walk(path) {
        try {
            const dir = await fs_1.promises.opendir(path);
            for await (const item of dir) {
                if (item.isFile())
                    yield path_1.join(dir.path, item.name);
                else if (item.isDirectory())
                    yield* this.walk(path_1.join(dir.path, item.name));
            }
        }
        catch (error) {
            // Specifically ignore ENOENT, which is commonly raised by fs operations
            // to indicate that a component of the specified pathname does not exist.
            // No entity (file or directory) could be found by the given path.
            if (error.code !== 'ENOENT')
                this.onError(error, path);
        }
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map