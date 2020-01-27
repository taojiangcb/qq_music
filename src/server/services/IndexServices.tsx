import React, { Fragment } from 'react';

import { IndexServer } from '../interface/IndexService';
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
import { config } from '../config/Config';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-px2vw';

import { NormalTheme, AppStyled } from '../../assets/AppCss';
import { GlobalStyle } from '../../assets/Reset';

type contextProp = { css?: string }


@provide(TAGS.InderSvervices)
export class IndexService implements IndexServer {

  constructor() { }
  //html模板内容
  private htmltemp: string = "";
  render(store: Store, ctx: RouterContext, context: StaticRouterContext & contextProp) {
    //指定当前路由的路径和路由的穿透参数 
    //context 穿透参数 贯穿整个路由的组件
    //localtion 当前路由的路径
    let sheet = new ServerStyleSheet();
    let content = renderToString(sheet.collectStyles(
      <StyleSheetManager sheet={sheet.instance}>
        <Fragment>
          <GlobalStyle />
          <AppStyled />
          <Provider store={store} >
            <ThemeProvider theme={NormalTheme}>
              <StaticRouter location={ctx.request.path} context={context} >
                {renderRoutes(Routers)}
              </StaticRouter>
            </ThemeProvider>
          </Provider>
        </Fragment>
      </StyleSheetManager>
    ));

    context.css = sheet.getStyleTags();

    if (!this.htmltemp) {
      this.htmltemp = String(fs.readFileSync(config.paths.ssrTemp.slice(1)));
    }

    const helmet = Helmet.renderStatic();
    let storeData = JSON.stringify(store.getState());
    let headContent = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${context.css}
    `
    let html = this.htmltemp.replace('<!--{header-content}-->', headContent);
    html = html.replace('<!--{content}--->', content);
    let scriptContent = `<script>window.content = ${storeData}</script>`;
    html = html.replace(/\<!--\{script\}--\>/gi, scriptContent);
    return html;
  }
}