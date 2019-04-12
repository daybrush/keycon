import Component from "@egjs/component";
import { names } from "keycode";
import { isString, isArray, addEvent } from "@daybrush/utils";

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
function getKey(keyCode: number) {
    let key = names[keyCode] || "";

    for (const name in codeData) {
        key = key.replace(name, codeData[name]);
    }
    return key.replace(/\s/g, "");
}
function getCombi(e: KeyboardEvent, key: string) {
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
    key: string;
    keyCode: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
}
/**
 */
class KeyController extends Component {
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
    constructor(container: Window | Document | HTMLElement = window) {
        super();

        addEvent(container, "blur", this.clear);
        addEvent(container, "keydown", this.keydownEvent);
        addEvent(container, "keyup", this.keyupEvent);
    }
    public clear = () => {
        this.ctrlKey = false;
        this.altKey = false;
        this.shiftKey = false;
        this.metaKey = false;
    }
    public keydown(comb: string | string[], callback: (e: KeyControllerEvent) => void): this;
    public keydown(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public keydown(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        return this.addEvent("keydown", comb, callback);
    }
    public keyup(comb: string | string[], callback: (e: KeyControllerEvent) => void): this;
    public keyup(callback: (e: KeyControllerEvent) => void): this;
    /**
     *
     */
    public keyup(
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        return this.addEvent("keyup", comb, callback);
    }
    private addEvent(
        type: "keydown" | "keyup",
        comb: string | string[] | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        let name: string = type;
        if (isArray(comb)) {
            name = `${type}.${getArrangeCombi(comb).join(".")}`;
        } else if (isString(comb)) {
            name = `${type}.${comb}`;
        }
        this.on(name, callback);
        return this;
    }
    private triggerEvent(type: "keydown" | "keyup", e: KeyboardEvent) {
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;

        const key = getKey(e.keyCode);
        const param: KeyControllerEvent = {
            key,
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