module.exports = {
    devServer: { port: 8081 },

};
proxyObj['/ws'] = {
    ws: true,
    target: 'ws://localhost:8081'
}
