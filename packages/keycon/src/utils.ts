import { names } from "keycode";

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
export function getKey(keyCode: number, keyName?: string): string {
    let key = (names[keyCode] || keyName || "").toLowerCase();

    for (const name in codeData) {
        key = key.replace(name, codeData[name]);
    }
    return key.replace(/\s/g, "");
}

/**
 * @memberof KeyController
 */
export function getCombi(e: KeyboardEvent, key: string = getKey(e.keyCode, e.key)): string[] {
    const keys = getModifierCombi(e);
    keys.indexOf(key) === -1 && keys.push(key);

    return keys.filter(Boolean);
}

/**
 * @memberof KeyController
 */
export function getModifierCombi(e: KeyboardEvent): string[] {
    const keys = [e.shiftKey && "shift", e.ctrlKey && "ctrl", e.altKey && "alt", e.metaKey && "meta"];

    return keys.filter(Boolean);
}

/**
 * @memberof KeyController
 */
export function getArrangeCombi(keys: string[]) {
    const arrangeKeys = keys.slice();
    arrangeKeys.sort((prev, next) => {
        const prevScore = keysSort[prev] || 5;
        const nextScore = keysSort[next] || 5;

        return prevScore - nextScore;
    });

    return arrangeKeys;
}
