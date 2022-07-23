import { RefObject } from "react";
import { useReactive } from "@cfcs/react";
import { observe, reactive } from "@cfcs/core";
import KeyController from "keycon";


export interface KeyControllerOptions {
    ref?: RefObject<HTMLElement | null | undefined>;
    keys: string | string[];
}

export function useKeycon(props: KeyControllerOptions) {
    return useReactive({
        state: { isKeydown : false },
        mounted() {
            const keycon = new KeyController(props.ref?.current ?? window);
            const isKeydown = observe(false);

            keycon.keydown(props.keys, () => {
                isKeydown.current = true;
            });
            keycon.keyup(props.keys, () => {
                isKeydown.current = false;
            });

            return reactive({
                inst: keycon,
                destroy: () => keycon.destroy(),
                isKeydown,
            });
        },
        destroy(inst) {
            inst.destroy();
        },
        events: ["keydown", "keyup", "blur"],
        on(inst, name, callback) {
            const keycon = inst.inst;

            if (name === "keydown") {
                keycon.keydown(props.keys, callback as any);
            } else if (name === "keyup") {
                keycon.keyup(props.keys, callback as any);
            } else {
                keycon.on(name, callback as any);
            }
        },
        off(inst, name, callback) {
            const keycon = inst.inst;

            if (name === "keydown") {
                keycon.offKeydown(props.keys, callback as any);
            } else if (name === "keyup") {
                keycon.offKeyup(props.keys, callback as any);
            } else {
                keycon.off(name, callback as any);
            }
        },
    });
}
