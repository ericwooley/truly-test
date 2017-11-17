// load the default config generator.
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
var path = require("path");
const Dotenv = require("dotenv-webpack");
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  config.plugins.push(
    new Dotenv({
      path: path.join(__dirname, "../.env")
    })
  );
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("ts-loader")
  });
  config.resolve.extensions = config.resolve.extensions || [];
  config.resolve.extensions.push(".ts", ".tsx");
  console.log("using config", config);
  return config;
};
