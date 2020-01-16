module.exports = {
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
		],
		['minify', { builtIns: false }]
	],
	ignore: [
		"./src/CallerComponents.jsx",
		"./src/indexRender.jsx",
		"./src/**/spec.js"
	],
	plugins: [
	  "@babel/plugin-syntax-dynamic-import"
	]
}