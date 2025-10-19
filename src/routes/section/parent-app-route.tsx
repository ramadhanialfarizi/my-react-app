import type { RouteObject } from "react-router-dom";
import App from "../../App";

export const parentAppRoute: RouteObject[] = [
    {
        path: "/",
        element: <App />
    }
];