import type { RouteObject } from "react-router-dom";
import ProfileModule from "../../profile";

export const profileRoute: RouteObject[] = [
    {
        path: "/profile",
        element: <ProfileModule />
    }
];