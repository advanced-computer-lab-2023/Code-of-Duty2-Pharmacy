import { Route } from "../types";

/**
 * Returns the first path from a route path.
 */
const getRouteFirstPath = (route: Route) => {
  const parts = route.path.split("/");
  return parts[1];
}

export default getRouteFirstPath;