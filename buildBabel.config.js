module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "last 2 versions",
        },
        modules: false,
        loose: false,
      },
    ],
    ["minify", { builtIns: false }],
  ],
  ignore: [
    "./src/CallerComponents.jsx",
    "./src/DesktopLayout.jsx",
    "./src/example_color.js",
    "./src/indexRender.jsx",
    "./src/MobileLayout.jsx",
    "./src/TabletLayout.jsx",
    "./src/Layout.jsx",
    "./src/**/spec.js",
    "__snapshots__",
    "./src/**/**.md",
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"],
};
