import Component from "@egjs/component";
import { names } from "keycode";

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

export class KeyController extends Component {
    constructor() {
        super();

        window.addEventListener("keydown", this.keydownEvent);
        window.addEventListener("keyup", this.keyupEvent);
    }
    public keydown(comb: string, callback: (e: KeyboardEvent) => void) {
        return this.on(`keydown.${comb}`, callback);
    }
    public keyup(comb: string, callback: (e: KeyboardEvent) => void) {
        return this.on(`keyup.${comb}`, callback);
    }
    private triggerEvent(type: "keydown" | "keyup", e: KeyboardEvent) {
        const key = getKey(e.keyCode);

        this.trigger(`${type}.${key}`, {
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
        });
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
