import { useRoutes } from "react-router-dom";
import { flowBuilderRoute } from "./section/flow-builder-route";
import {homeRoute} from "./section/home-route";
import { parentAppRoute } from "./section/parent-app-route";
import { profileRoute } from "./section/profile-routes";

function AppRoutes() {
    const routes = useRoutes([
        ...profileRoute,
        ...parentAppRoute,
        ...homeRoute,
        ...flowBuilderRoute, // import dari section
    ]);

    return routes;
}

export default AppRoutes;