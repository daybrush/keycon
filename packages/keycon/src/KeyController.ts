import EventEmitter, { EmitterParam, TargetParam } from "@scena/event-emitter";

import { isString, isArray, addEvent, removeEvent } from "@daybrush/utils";
import { getArrangeCombi, getKey, getCombi } from "./utils";

/**
 * @typedef
 * @memberof KeyController
 */
export interface KeyControllerEvent extends EmitterParam {
    inputEvent: KeyboardEvent;
    isToggle: boolean;
    key: string;
    keyCode: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
}

export interface OnKeydown extends KeyControllerEvent {

}
export interface OnKeyup extends KeyControllerEvent {

}
export interface OnBlur {

}
export interface KeyconEvents {
    keydown: OnKeydown;
    keyup: OnKeyup;
    blur: OnBlur;
}
export type KeyControllerEvents = KeyconEvents;

let globalKeyController!: KeyController;

/**
 */
class KeyController extends EventEmitter<KeyconEvents & { [text: string]: any }> {
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
    constructor(public container: Window | Document | HTMLElement = window) {
        super();

        addEvent(container, "blur", this.blur);
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
    public destroy() {
        const container = this.container as any;

        this.clear();
        this.off();
        removeEvent(container, "blur", this.blur);
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

        const key = getKey(e.keyCode, e.key);
        const isToggle = key === "ctrl"
            || key === "shift"
            || key === "meta"
            || key === "alt";
        const param: TargetParam<KeyControllerEvent> = {
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
    private blur = () => {
        this.clear();
        this.trigger("blur");
    }
}

export default KeyController;
