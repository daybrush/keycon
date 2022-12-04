import { VueReactiveAdapterResult, useReactive, } from "@cfcs/vue2";
import { REACTIVE, ReactiveKeyControllerData } from "keycon";
import { Ref } from "@vue/composition-api";


export interface VueKeyControllerProps extends ReactiveKeyControllerData {
    ref?: Ref<HTMLElement | null | undefined>;
}
export interface VueKeyControllerResult extends VueReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: VueKeyControllerProps): VueKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}
