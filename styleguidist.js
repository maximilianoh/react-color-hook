const styleguidist = require('react-styleguidist');
const open = require('open');
const styleguide = styleguidist({
    logger: {
        error: console.error,
        info: console.log,
        debug: console.log,
        warn: console.warn,
    },
    title: 'React Style Guide Example',
    components: 'src/components/**/*.jsx',
    ignore:[
      'src/components/chrome/ChromePointerCircle.jsx',
      'src/components/photoshop/PhotoshopPointerCircle.jsx',
      'src/components/photoshop/PhotoshopPointer.jsx',
      'src/components/common/*/**'
    ],
    serverPort: 6065,
    serverHost: '127.0.0.1',
    webpackConfig: {
        module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    plugins:["@babel/plugin-syntax-dynamic-import"]
                  }
                }
              }
            ],
          },
    },
    assetsDir: 'devWebpackServer/',
});

styleguide.server(
    (err, config) => {
        if (err) {
            console.log(err)
        } else {
            const url = `http://${config.serverHost}:${config.serverPort}`;
            open(url);
        }
    }
)
