import { env } from "../../env/Env";
import { iConfig } from './IConfig';

let mode = env.mode || "dev";
let version = env.version || 'dev_1.0.0';

let importCfg = require(`./Config.${mode}`).config;
let config: iConfig = importCfg || {};
config.version = version;

export { config }