import { Model } from "../../modules/User";
import { Store } from "redux";
import { RouterContext } from "koa-router";
import { StaticRouterContext } from "react-router";

export interface IndexServer {
  render(store: Store, ctx: RouterContext, context: StaticRouterContext);
}