import PageNotFound from "../../pages/error/PageNotFound";
import ServerNotAvailable from "../../pages/error/ServerNotFound";
import { Route } from "../../types";

export const pageNotFoundRoute: Route = {
  path: "*",
  element: <PageNotFound />,
};
export const serverNotAvailableRoute: Route = {
  path: "/server-not-available",
  element: <ServerNotAvailable />,
};

const routes = [pageNotFoundRoute, serverNotAvailableRoute];

export default routes;
