let objectConfig = {};
if (process.env.NODE_ENV === "test") {
	objectConfig = {presets: ['@babel/preset-env', '@babel/preset-react'], plugins:["@babel/transform-runtime"]}
}
else{
	objectConfig = {
		presets: [
      		"@babel/preset-react",
		      [
		          "@babel/preset-env",
		          {
		              "targets": {
		                  "browsers": "last 2 versions"
		              },
		              "modules": false,
		              "loose": false
		          }
		      ]
		  ],
		  plugins: [
			"@babel/plugin-syntax-dynamic-import"
		  ]
	}
}

module.exports = objectConfig