const path = require("path");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "dev/index.html"),
});

const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  getDisplayName: (filename, bindingName) => {
    return `${bindingName || filename}`;
  },
  displayName: true,
});
const config = {
  entry: {
    "apollo-client-demo": [
      "react-hot-loader/patch",
      path.join(__dirname, "dev/index.tsx"),
    ],
    "apollo-client-demo.min.css": [path.resolve(__dirname, "src/styles.css")],
  },

  mode: "development",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.join(__dirname, "tsconfig.json"),
      }),
    ],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: "TypeScript",
      excludeWarnings: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      // This rule is necessary for our lovely friend IE
      {
        test: /\.js$/,
        include: /node_modules\/react-laag\/dist\/index\.js/,
        use: [{ loader: "ts-loader", options: { transpileOnly: true } }],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        type: "asset/inline",
      },
      {
        test: /\.svg$/,
        use: "svg-react-loader",
      },
    ],
  },
};

module.exports = (env, argv) => {
  const isDevMode = argv.mode === "development";
  config.module.rules.push({
    test: /\.(sass|css|scss)$/,
    use: [
      isDevMode
        ? "style-loader"
        : {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: false, publicPath: "/" },
          },
      "css-loader",
    ],
  });
  if (isDevMode) {
    config.output = {
      publicPath: "/",
      assetModuleFilename: "assets/[hash][ext][query]",
    };
    config.devServer = {
      historyApiFallback: true,
      port: 3002,
      hot: true,
      proxy: {
        "/apollo-client-demo-server/graphql": {
          target: "http://localhost:4009/",
        },
      },
    };
    // Enable sourcemaps for debugging webpack's output.
    config.devtool = "eval-source-map";
    config.plugins.push(htmlWebpackPlugin);
    config.plugins.push(
      new MiniCssExtractPlugin({ filename: "src/styles.css" })
    );
  }

  const copyPlugin = new CopyWebpackPlugin({
    patterns: [
      { from: path.join(__dirname, "assets"), to: path.join(__dirname, "dist/assets"), noErrorOnMissing: true },
    ],
  });

  if (argv.mode === "production") {
    config.entry = {
      main: path.join(__dirname, "src/index.tsx"),
    };

    config.module.rules.push({
      test: /(fonts.css)$/,
      use: ["ignore-loader"],
    });

    config.output = {
      // output directory as an absolute path
      path: path.join(__dirname, "./dist/"),
      // name of output bundle
      filename: "[name].js",
      libraryTarget: "umd",
      chunkFilename: '[name].[chunkhash].js',
    };
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "main.css",
      })
    );
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../webpack-report.html',
      openAnalyzer: false
    }));
    config.plugins.push(copyPlugin);
    config.externals = {
      // Don't bundle react, react-dom or highcharts
      react: "React",
      "react-dom": "ReactDOM",
      highcharts: "Highcharts",
      "highcharts/modules/accessibility": "HighchartsAccessibility",
      "highcharts/highstock": "Highcharts",
    };
  }

  return config;
};
