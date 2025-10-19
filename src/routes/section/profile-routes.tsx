import type { RouteObject } from "react-router-dom";
import ProfileModule from "../../module/profile";

export const profileRoute: RouteObject[] = [
    {
        path: "/module/profile",
        element: <ProfileModule />
    }
];