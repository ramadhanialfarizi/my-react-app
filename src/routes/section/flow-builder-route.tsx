import type { RouteObject } from "react-router-dom";
import FlowBuilderModule from "../../flow-builder";

export const flowBuilderRoute: RouteObject[] = [
    {
        path: "/flow-builder",
        element: <FlowBuilderModule />
    }
];