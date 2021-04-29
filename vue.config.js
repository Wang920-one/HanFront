module.exports = {
    devServer: { port: 8081 },

};

const webpack = require('webpack');

module.exports = {

    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill'
        }])

    }
};

