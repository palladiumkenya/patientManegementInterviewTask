const config = require('./config');
const ConfigService = {
    getConfig: () => {
        return config;
    }
}
Object.freeze(ConfigService);
export default ConfigService;
  