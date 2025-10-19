import { useRoutes } from "react-router-dom";
import { flowBuilderRoute } from "./section/flow-builder-route";
import {homeRoute} from "./section/home-route";
import { parentAppRoute } from "./section/parent-app-route";
import { profileRoute } from "./section/profile-routes";
import { playgroundGamesRoute } from "./section/playground-games-route";

function AppRoutes() {
    const routes = useRoutes([
        ...playgroundGamesRoute,
        ...profileRoute,
        ...parentAppRoute,
        ...homeRoute,
        ...flowBuilderRoute, // import dari section
    ]);

    return routes;
}

export default AppRoutes;