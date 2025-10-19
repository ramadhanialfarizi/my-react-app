import type { RouteObject } from "react-router-dom";
import HomeModule from "../../module/home";

export const homeRoute: RouteObject[] = [
    {
        path: "/module/home",
        element: <HomeModule />
    }
];