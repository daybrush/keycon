import Component from "@egjs/component";
import { names } from "keycode";
import { isString, isArray, addEvent, removeEvent } from "@daybrush/utils";

const codeData = {
    "+": "plus",
    "left command": "meta",
    "right command": "meta",
};
const keysSort = {
    shift: 1,
    ctrl: 2,
    alt: 3,
    meta: 4,
};
/**
 * @memberof KeyController
 */
export function getKey(keyCode: number): string {
    let key = names[keyCode] || "";

    for (const name in codeData) {
        key = key.replace(name, codeData[name]);
    }
    return key.replace(/\s/g, "");
}

/**
 * @memberof KeyController
 */
export function getCombi(e: KeyboardEvent, key: string = getKey(e.keyCode)): string[] {
    const keys = [e.shiftKey && "shift", e.ctrlKey && "ctrl", e.altKey && "alt", e.metaKey && "meta"];
    keys.indexOf(key) === -1 && keys.push(key);

    return keys.filter(Boolean);
}

function getArrangeCombi(keys: string[]) {
    const arrangeKeys = keys.slice();
    arrangeKeys.sort((prev, next) => {
        const prevScore = keysSort[prev] || 5;
        const nextScore = keysSort[next] || 5;

        return prevScore - nextScore;
    });

    return arrangeKeys;
}
/**
 * @typedef
 * @memberof KeyController
 */
export interface KeyControllerEvent {
    inputEvent: KeyboardEvent;
    isToggle: boolean;
    key: string;
    keyCode: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
}
let globalKeyController!: KeyController;

/**
 */
class KeyController extends Component {
    /**
     */
    public static get global() {
        return globalKeyController || (globalKeyController = new KeyController());
    }
    public static setGlobal() {
        return this.global;
    }
    /**
     */
    public ctrlKey = false;
    /**
     */
    public altKey = false;
    /**
     *
     */
    public shiftKey = false;
    /**
     *
     */
    public metaKey = false;
    /**
     *
     */
    constructor(private container: Window | Document | HTMLElement = window) {
        super();

        addEvent(container, "blur", this.clear);
        addEvent(container, "keydown", this.keydownEvent);
        addEvent(container, "keyup", this.keyupEvent);
    }
    public clear = (): this => {
        this.ctrlKey = false;
        this.altKey = false;
        this.shiftKey = false;
        this.metaKey = false;
        return this;
    }
    /**
     *
     */
    public destory() {
        const container = this.container as any;

        this.clear();
        this.off();
        removeEvent(container, "blur", this.clear);
        removeEvent(container, "keydown", this.keydownEvent);
        removeEvent(container, "keyup", this.keyupEvent);
    }
    public keydown(comb: string | string[], callback: (e: KeyControllerEvent) => void): this;
    public keydown(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public keydown(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ): this {
        return this.addEvent("keydown", comb, callback);
    }
    public offKeydown(comb: string | string[], callback?: (e: KeyControllerEvent) => void): this;
    public offKeydown(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public offKeydown(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ): this {
        return this.removeEvent("keydown", comb, callback);
    }
    public offKeyup(comb: string | string[], callback?: (e: KeyControllerEvent) => void): this;
    public offKeyup(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public offKeyup(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ): this {
        return this.removeEvent("keyup", comb, callback);
    }
    public keyup(comb: string | string[], callback: (e: KeyControllerEvent) => void): this;
    public keyup(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public keyup(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ): this {
        return this.addEvent("keyup", comb, callback);
    }
    private addEvent(
        type: "keydown" | "keyup",
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        if (isArray(comb)) {
            this.on(`${type}.${getArrangeCombi(comb).join(".")}`, callback);
        } else if (isString(comb)) {
            this.on(`${type}.${comb}`, callback);
        } else {
            this.on(type, comb);
        }
        return this;
    }
    private removeEvent(
        type: "keydown" | "keyup",
        comb: string | string[] | ((e: KeyControllerEvent) => void) | undefined,
        callback?: (e: KeyControllerEvent) => void,
    ) {
        if (isArray(comb)) {
            this.off(`${type}.${getArrangeCombi(comb).join(".")}`, callback);
        } else if (isString(comb)) {
            this.off(`${type}.${comb}`, callback);
        } else {
            this.off(type, comb);
        }
        return this;
    }
    private triggerEvent(type: "keydown" | "keyup", e: KeyboardEvent) {
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;

        const key = getKey(e.keyCode);
        const isToggle = key === "ctrl"
            || key === "shift"
            || key === "meta"
            || key === "alt";
        const param: KeyControllerEvent = {
            key,
            isToggle,
            inputEvent: e,
            keyCode: e.keyCode,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
        };
        this.trigger(type, param);
        this.trigger(`${type}.${key}`, param);

        const combi = getCombi(e, key);

        combi.length > 1 && this.trigger(`${type}.${combi.join(".")}`, param);
    }
    private keydownEvent = (e: KeyboardEvent) => {
        this.triggerEvent("keydown", e);
    }
    private keyupEvent = (e: KeyboardEvent) => {
        this.triggerEvent("keyup", e);
    }
}

export default KeyController;
