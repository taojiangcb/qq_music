import { interfaces, TYPE, controller, httpGet } from "inversify-koa-utils";
import { provideThrowable, TAGS, TYPES } from "../ioc/Ioc";
import { inject } from "inversify";
import { IRouterContext } from 'koa-router'
import { Model } from "../../modules/User";

import { matchRoutes } from 'react-router-config';
import { ssrStore } from "../../store/Store";
import { Routers } from "../../routers/Routers";
import { StaticRouterContext } from "react-router";
import { IndexServer } from '../interface/IndexService';
import fs from 'fs';
@controller('/')
@provideThrowable(TYPE.Controller, 'IndexController')
export class IndexController implements interfaces.Controller {
  private indexService: IndexServer;
  constructor(@inject(TAGS.InderSvervices) indexService) {
    console.log('indexService', indexService);
    this.indexService = indexService;
  }

  @httpGet('*')
  private async index(ctx: IRouterContext) {

    console.log(fs.readFileSync('ssrindex.html'));

    //获取一个 sotre() 的实例
    let store = ssrStore();
    let matchedRouters = matchRoutes(Routers, ctx.request.path);
    //get到相关的promiese
    let promisess = [];

    matchedRouters.forEach(item => {
      if (item.route.loadData) {
        //数据转载的时候容错处理，不管接口是否请求成功，最后都要进行渲染，失败的接口最多不显示内容而已。
        let promise = new Promise((resolve, reject) => {
          item.route.loadData(store)
            .then(resolve)
            .catch(resolve)
        });
        promisess.push(promise);
      }
    });

    /** 相关的promiss 处理完成之后 开始渲染page */
    Promise.all(promisess)
      .then(async load => {
        //定义服务器的路由渲染的穿透参数
        let context: StaticRouterContext & { NOT_FUND?: boolean } = {};
        let html = await this.indexService.render(store, ctx, context);
        if (context.action === 'REPLACE') {
          ctx.redirect(context.url);
        }
        else if (context.NOT_FUND) {
          ctx.response.status = 404;
        }
        ctx.response.body = html;
      });
  }
}