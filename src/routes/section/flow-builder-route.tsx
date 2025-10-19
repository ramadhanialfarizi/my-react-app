import type { RouteObject } from "react-router-dom";
import FlowBuilderModule from "../../module/flow-builder";

export const flowBuilderRoute: RouteObject[] = [
    {
        path: "/module/flow-builder",
        element: <FlowBuilderModule />
    }
];