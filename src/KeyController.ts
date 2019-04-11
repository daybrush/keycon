import Component from "@egjs/component";
import { names } from "keycode";
import { isString } from "@daybrush/utils";

const codeData = {
    "+": "plus",
    "left command": "meta",
    "right command": "meta",
};
function getKey(keyCode: number) {
    let key = names[keyCode] || "";

    for (const name in codeData) {
        key = key.replace(name, codeData[name]);
    }

    return key.replace(/\s/g, "");
}
export interface KeyControllerEvent {
    inputEvent: KeyboardEvent;
    key: string;
    keyCode: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
}
export class KeyController extends Component {
    constructor(container: Window | Document | HTMLElement = window) {
        super();

        container.addEventListener("keydown", this.keydownEvent);
        container.addEventListener("keyup", this.keyupEvent);
    }
    public keydown(comb: string, callback: (e: KeyControllerEvent) => void): this;
    public keydown(callback: (e: KeyControllerEvent) => void): this;
    public keydown(
        comb: string | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        if (isString(comb)) {
            return this.on(`keydown.${comb}`, callback);
        } else {
            return this.on(`keydown`, callback);
        }
    }
    public keyup(comb: string, callback: (e: KeyControllerEvent) => void): this;
    public keyup(callback: (e: KeyControllerEvent) => void): this;
    public keyup(
        comb: string | ((e: KeyControllerEvent) => void),
        callback?: (e: KeyControllerEvent) => void,
    ) {
        if (typeof comb === "string") {
            return this.on(`keyup.${comb}`, callback);
        } else {
            return this.on(`keyup`, callback);
        }
    }
    private triggerEvent(type: "keydown" | "keyup", e: KeyboardEvent) {
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
    }
    private keydownEvent = (e: KeyboardEvent) => {
        this.triggerEvent("keydown", e);
    }
    private keyupEvent = (e: KeyboardEvent) => {
        this.triggerEvent("keyup", e);
    }
}

export default function keycon() {
    return new KeyController();
}
