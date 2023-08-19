const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //! here this will be common for dev and prod so move this to common
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');


const devConfig = {
    mode: 'development',
    output: {
        publicPath: "http://localhost:8080/"
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        // }),

        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: "marketing@http://localhost:8081/remoteEntry.js",
                auth: "auth@http://localhost:8082/remoteEntry.js",
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,  //* if we don't want to specify manually dependency and don't care about specific version then we can directly pass package.json dependencies
        })
    ]
}


module.exports = merge(commonConfig, devConfig);