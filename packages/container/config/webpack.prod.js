const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;
console.log("domain name in container config webpack prod .. ", domain)

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',  //! main.4c9105248fea4399b6c4.js something like this filename will be generated here and will get injected in script ----->  <script src="main.4c9105248fea4399b6c4.js"></script>
        publicPath: '/container/latest/',     // TODO: <-- "<script src="/container/latest/main.4c9105248fea4399b6c4.js"></script> -->   ['/container/latest/'] this is the path of aws s3 buket where of build files are stored - so this will append like this [https://d1sgfkawljuibl.cloudfront.net/container/latest/main.js] , where "https://d1sgfkawljuibl.cloudfront.net" this is domain name, "/container/latest/" this is path of s3 where build folder is, "main.js" this is the entry file inside build pointer , here "main.js" is assumed as this will be [filename] whatever dynamically generated in above line
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]
}


module.exports = merge(commonConfig, prodConfig)