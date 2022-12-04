import { ReactiveAdapter, reactive, Ref, observe, ReactiveObject, Observer } from "@cfcs/core";
import KeyController, { KeyControllerEvents, KeyControllerEvent } from "./KeyController";

export interface ReactiveKeyControllerData {
    ref?: Ref<HTMLElement | null | undefined>;
    checker?: (e: KeyControllerEvent) => boolean;
    keys: string | string[];
}

export type ReactiveKeyController = ReactiveObject<{
    inst: KeyController;
    keys: string | string[];
    isKeydown: Observer<boolean>;
    destroy(): void;
}>;

let instanceMap!: Map<HTMLElement | Window | Document, {
    inst: KeyController;
    count: number;
}>;

export const REACTIVE: ReactiveAdapter<
    ReactiveKeyController,
    { isKeydown: boolean },
    never,
    ReactiveKeyControllerData,
    KeyControllerEvents
> = {
    events: ["keydown", "keyup", "blur"],
    state: { isKeydown: false },
    mounted(data) {
        if (!instanceMap) {
            instanceMap = new Map();
        }
        const element = data.ref?.current ?? window;

        let info = instanceMap.get(element);

        if (!info) {
            info = {
                inst: new KeyController(element),
                count: 0,
            };

            instanceMap.set(element, info);
        }
        ++info.count;

        const keycon = info.inst;
        const keys = data.keys;
        const isKeydown = observe(false);
        const checker = data.checker;

        keycon.keydown(keys, (e: KeyControllerEvent) => {
            if (!checker || checker(e)) {
                isKeydown.current = true;
            }
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
    destroy({ inst }) {
        const element = inst.container;
        const info = instanceMap.get(element);

        --info.count;
        if (!info.count) {
            inst.destroy();
            instanceMap.delete(element);
        }
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
