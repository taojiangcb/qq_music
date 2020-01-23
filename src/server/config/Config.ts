import { env } from "../../env/Env";
import { iConfig } from './IConfig';

let mode = env.mode || "dev";

let importCfg = require(`./Config.${mode}`).config;
let config:iConfig = importCfg || {};

export { config }