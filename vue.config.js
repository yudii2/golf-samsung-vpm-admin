process.env.VUE_APP_VERSION = require("./package.json").version;
const DEVELOPMENT = "development";
const STAGE = "stage";
const PRODUCTION = "production";

const outputDir = getDeploymentDirectoryName();
const publicPath = process.env.NODE_ENV === DEVELOPMENT ? "/" : "/adminFront";

module.exports = {
  /**
   * Plugin Options.
   */
  pluginOptions: {
    i18n: {
      locale: "ko",
      fallbackLocale: "ko",
      localeDir: "locales",
      enableInSFC: false,
    },
  },

  /**
   * Public path.
   * The base URL your application bundle will be deployed at (known as baseUrl before Vue CLI 3.3).
   * This is the equivalent of webpack's output.
   * publicPath, but Vue CLI also needs this value for other purposes,
   * so you should always use publicPath instead of modifying webpack output.publicPath.
   */
  publicPath,

  /**
   * Output Directory.
   * The directory where the production build files will be generated in when running vue-cli-service build.
   * Note the target directory will be removed before building (this behavior can be disabled by passing --no-clean when building).
   */
  outputDir,

  /**
   * Dev server.
   * Some values like host, port and https may be overwritten by command line flags.
   * Some values like publicPath and historyApiFallback should not be modified as they need to be synchronized with publicPath for the dev server to function properly.
   */
  devServer: {
    overlay: false,
  },

  /**
   *  Lint On Save.
   */
  lintOnSave: false,

  configureWebpack: {
    output: {
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[hash].js",
    },
  },
  productionSourceMap: false,
};

/**
 * ### 배포 시 폴더명을 설정하는 유틸리티 함수.
 *
 */
function getDeploymentDirectoryName() {
  const defaultName = "dist";
  const appVersion = String(process.env.VUE_APP_VERSION);
  const parsedAppVersion = appVersion.replace(".", "_");
  const finalParsedAppVersion = parsedAppVersion.replace(".", "_");
  switch (process.env.NODE_ENV) {
    case "development":
      return `${defaultName}_${DEVELOPMENT}_${finalParsedAppVersion}`;
    case "stage":
      return `${defaultName}_${STAGE}_${finalParsedAppVersion}`;
    case "production":
      return `${defaultName}_${PRODUCTION}_${finalParsedAppVersion}`;
    default:
      return defaultName;
  }
}
