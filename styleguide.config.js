module.exports = {
  components: "src/components/**/*.jsx",
  ignore: [
    "src/components/chrome/ChromePointerCircle.jsx",
    "src/components/photoshop/PhotoshopPointerCircle.jsx",
    "src/components/photoshop/PhotoshopPointer.jsx",
    "src/components/common/*/**",
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-syntax-dynamic-import"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
};
