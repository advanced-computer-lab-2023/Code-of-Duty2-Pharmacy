import PageNotFound from "../../pages/error/PageNotFound";
import ServerNotAvailable from "../../pages/error/ServerNotFound";
import { Route } from "../../types";

export const pageNotFoundRoute: Route = {
  path: "/page-not-found",
  component: <PageNotFound />,
};
export const serverNotAvailableRoute: Route = {
  path: "/server-not-available",
  component: <ServerNotAvailable />,
};

const routes = [pageNotFoundRoute, serverNotAvailableRoute];

export default routes;
