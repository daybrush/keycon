import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { Ref } from "@cfcs/core";
import { REACTIVE } from "keycon";


export interface KeyControllerOptions {
    ref?: Ref<HTMLElement | null | undefined>;
    keys: string | string[];
}
export interface SvelteKeyControllerResult extends SvelteReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: KeyControllerOptions): SvelteKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}
