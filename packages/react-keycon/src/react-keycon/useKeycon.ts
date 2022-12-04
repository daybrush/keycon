import { RefObject } from "react";
import { ReactReactiveAdapterResult, useReactive, } from "@cfcs/react";
import { REACTIVE, ReactiveKeyControllerData } from "keycon";


export interface ReactKeyControllerProps extends ReactiveKeyControllerData {
    ref?: RefObject<HTMLElement | null | undefined>;
}
export interface ReactKeyControllerResult extends ReactReactiveAdapterResult<typeof REACTIVE> {
}

export function useKeycon(props: ReactKeyControllerProps): ReactKeyControllerResult {
    return useReactive({
        ...REACTIVE,
        data() {
            return props;
        },
    });
}
