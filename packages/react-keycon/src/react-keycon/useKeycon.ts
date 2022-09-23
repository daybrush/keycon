import { RefObject } from "react";
import { ReactReactiveAdapterResult, useReactive, } from "@cfcs/react";
import { REACTIVE } from "keycon";


export interface KeyControllerOptions {
    ref?: RefObject<HTMLElement | null | undefined>;
    keys: string | string[];
}
export interface ReactKeyControllerResult extends ReactReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: KeyControllerOptions): ReactKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}
