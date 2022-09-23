import { VueReactiveAdapterResult, useReactive, } from "@cfcs/vue3";
import { REACTIVE } from "keycon";
import { Ref } from "vue";


export interface KeyControllerOptions {
    ref?: Ref<HTMLElement | null | undefined>;
    keys: string | string[];
}
export interface VueKeyControllerResult extends VueReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: KeyControllerOptions): VueKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}