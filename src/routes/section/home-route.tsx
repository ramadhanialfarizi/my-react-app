import type { RouteObject } from "react-router-dom";
import HomeModule from "../../home";

export const homeRoute: RouteObject[] = [
    {
        path: "/home",
        element: <HomeModule />
    }
];