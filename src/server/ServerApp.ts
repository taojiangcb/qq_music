import { Container, injectable, inject } from 'inversify';
import { interfaces, controller, InversifyKoaServer, httpGet, TYPE } from 'inversify-koa-utils';
import "reflect-metadata";
import co from "co";
import render from 'koa-swig';
import serve from 'koa-static';

import { config } from './config/Config';
import { buildProviderModule } from './ioc/Ioc';
import { LogHandler } from './middleware/ErrorHandler';

import './controllers/IndexController';
import './services/IndexServices';
import { resolve } from 'path';
import { Log } from './log/Log';

//初始化日志
Log.initConfig();

/*** 当node 进程退出时候处理 */
process.addListener("exit", (code: number) => {
  Log.log("exit code" + code);
});

/*** 当node 进程崩溃的时候处理 */
process.addListener("uncaughtException", (err: Error) => {
  if (err.message) { Log.errorLog(err.message); }
  if (err.stack) { Log.errorLog(err.stack); }
})

/*** 当node 进程退出时候处理 */
process.addListener("exit", (code: number) => {
  Log.errorLog("exit code " + code);
});

const container = new Container();
container.load(buildProviderModule());

const server = new InversifyKoaServer(container);
server.setConfig(app => {
  Log.log(config.paths.static.slice(1));
  app.use(serve(resolve(config.paths.static.slice(1))));
  app.context.render = co.wrap(render({
    root: config.paths.view,
    autoescape: true,
    cache: "memory",
    ext: 'html',
    writeBody: false
  }))
}).setErrorConfig(app => {
  app.use(LogHandler)
})

const app = server.build();
const port: number = config.http_port || 3000;
app.listen(port, () => {
  console.log('server at ' + port);
})