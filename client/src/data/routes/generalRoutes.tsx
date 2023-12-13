import PageNotFound from "../../pages/error/PageNotFound";
import ServerNotAvailable from "../../pages/error/ServerNotFound";
import Unauthorized from "../../pages/error/Unauthorized";
import { Route } from "../../types";

export const pageNotFoundRoute: Route = {
  path: "*",
  element: <PageNotFound />
};

export const serverNotAvailableRoute: Route = {
  path: "/server-not-available",
  element: <ServerNotAvailable />
};

export const unauthorizedRoute: Route = {
  path: "/unauthorized",
  element: <Unauthorized />
};

const routes = [pageNotFoundRoute, serverNotAvailableRoute, unauthorizedRoute];

export default routes;
