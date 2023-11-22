const path = require('path');
require('module-alias').addAliases(
    {
        '@routers': path.resolve('src/routers'),
        '@controllers': path.resolve('src/controllers'),
        '@middlewares': path.resolve('src/middlewares'),
        '@models': path.resolve('src/models'),
        '@config': path.resolve('src/config')
    }
)