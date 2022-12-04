import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { Ref } from "@cfcs/core";
import { REACTIVE, ReactiveKeyControllerData } from "keycon";


export interface SvelteKeyControllerProps extends ReactiveKeyControllerData {
    ref?: Ref<HTMLElement | null | undefined>;
    keys: string | string[];
}
export interface SvelteKeyControllerResult extends SvelteReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: SvelteKeyControllerProps): SvelteKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}
