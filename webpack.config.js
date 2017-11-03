const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
	entry: {
		content: __dirname + '/src/content.js',
		background: __dirname + '/src/background.js',
	},
	output: {
		path: __dirname + '/dist/build',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react'],
                        plugins: [
                            ["import", { libraryName: "antd", style: "css" }] // `style: true` for less
                        ]
					}
				}
			},
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import: true
                        }
                    },
                	{
						loader: 'style-loader'
					}
				],
            }
		]
	},
	plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
	]
}
