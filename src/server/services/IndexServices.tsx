import React from 'react';

import { IndexServer } from '../interface/IndexService';
import { Model } from '../../modules/User';
import { provide } from 'inversify-binding-decorators';
import { TAGS } from '../ioc/Ioc';
import { Store } from 'redux';
import { RouterContext } from 'koa-router';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Routers } from '../../routers/Routers';
import { Helmet } from 'react-helmet';

import { resolve } from 'path';
import { promiseReadFile } from '../os/PromiseFile';
import fs from 'fs';

type contextProp = { css?: string }


@provide(TAGS.InderSvervices)
export class IndexService implements IndexServer {

  constructor() { }
  private htmltemp: string = "";


  async render(store: Store, ctx: RouterContext, context: StaticRouterContext & contextProp) {
    //指定当前路由的路径和路由的穿透参数 
    //context 穿透参数 贯穿整个路由的组件
    //localtion 当前路由的路径
    console.log(`--context--`);
    console.log(ctx.request.path);
    console.log(context);
    let content = renderToString(
      <Provider store={store} >
        <StaticRouter location={ctx.request.path} context={context} >
          {renderRoutes(Routers)}
        </StaticRouter>
      </Provider>
    );

    console.log(content);
    console.log(`--context end--`);


    if (!this.htmltemp) {
      console.log(__dirname);
      this.htmltemp = String(fs.readFileSync('123.txt'));//await promiseReadFile('ssrindex.html');
    }

    const helmet = Helmet.renderStatic();
    let storeData = JSON.stringify(store.getState());
    let headContent = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <style>${context.css}</style>
    `
    let html = this.htmltemp.replace('<!--{header-content}-->', headContent);
    html = html.replace('<!--{content}--->', content);
    let scriptContent = `<script>window.content = ${storeData}</script>`;
    html = html.replace(/\<!--\{script\}--\>/gi, scriptContent);
    return html;
  }
}