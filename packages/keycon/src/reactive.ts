import { ReactiveAdapter, reactive, Ref, observe, ReactiveObject, Observer } from "@cfcs/core";
import KeyController, { KeyconEvents } from "./KeyController";

export interface ReactiveKeyConData {
    ref?: Ref<HTMLElement>;
    keys: string | string[];
}
export type ReactiveKeyCon = ReactiveObject<{
    inst: KeyController;
    keys: string | string[];
    isKeydown: Observer<boolean>;
    destroy(): void;
}>;

export const REACTIVE: ReactiveAdapter<
    ReactiveKeyCon,
    { isKeydown: boolean },
    never,
    ReactiveKeyConData,
    KeyconEvents
> = {
    events: ["keydown", "keyup", "blur"],
    state: { isKeydown : false },
    mounted(data) {
        const keys = data.keys;
        const keycon = new KeyController(data.ref?.current ?? window);
        const isKeydown = observe(false);

        keycon.keydown(keys, () => {
            isKeydown.current = true;
        });
        keycon.keyup(keys, () => {
            isKeydown.current = false;
        });
        keycon.on("blur", () => {
            isKeydown.current = false;
        });

        return reactive({
            inst: keycon,
            keys,
            destroy: () => keycon.destroy(),
            isKeydown,
        });
    },
    destroy(inst) {
        inst.destroy();
    },
    on(inst, name, callback) {
        const keycon = inst.inst;

        if (name === "keydown") {
            keycon.keydown(inst.keys, callback as any);
        } else if (name === "keyup") {
            keycon.keyup(inst.keys, callback as any);
        } else {
            keycon.on(name, callback as any);
        }
    },
    off(inst, name, callback) {
        const keycon = inst.inst;

        if (name === "keydown") {
            keycon.offKeydown(inst.keys, callback as any);
        } else if (name === "keyup") {
            keycon.offKeyup(inst.keys, callback as any);
        } else {
            keycon.off(name, callback as any);
        }
    },
}
