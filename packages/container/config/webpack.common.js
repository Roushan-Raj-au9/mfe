const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,   //* when there is any file with extension of .mjs or .js ... process this file with babel
                exclude: /node_modules/, //* exclude node_modules when babel process
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}