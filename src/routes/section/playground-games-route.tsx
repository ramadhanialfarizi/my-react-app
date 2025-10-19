import type { RouteObject } from "react-router-dom";
import PlaygroundGamesModule from "../../module/playground-games";

export const playgroundGamesRoute: RouteObject[] = [
    {
        path: "/module/playground-games",
        element: <PlaygroundGamesModule />
    }
]