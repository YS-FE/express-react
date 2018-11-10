# exress-react
基于 express 服务的 react-ssr

# 运行

```
dev:    npm run dev
build:  npm run build
prod:   npm run start

```

# 问题
* 切换dev 到prod 模式时 ，需要手动修改 src/client/App.js中 对routes的引入

```js
// import routes from "./routes";
import routes from "./routes.dev";
```


# 目录结构 

```
├── build   编译打包配置
│   ├── dev.env.js
│   ├── prod.env.js
│   ├── setup-dev-server.js  dev模式服务
│   ├── util.js
│   ├── webpack.config.base.js
│   ├── webpack.config.client.js
│   └── webpack.config.server.js
|
├── config  全局的配置(接口代理等)
│   └── index.js
|
├── dist  打包输出目录
|
|
├── public  静态资源
│   └── favicon.ico
|
├── router   服务端路由
│   ├── api.js
│   └── index.js
|
├── server.js  服务端入口
|
|── temp  临时目录
|
└── src
    ├── api   数据接口
    │   ├── config.js
    │   └── index.js
    |
    ├── client  客户端代码
    │   ├── App.js
    │   ├── App.scss
    │   ├── assets
    │   │   ├── css
    │   │        └── normalize.css
    │   │   
    │   │      
    │   ├── component
    │   │   ├── Search
    │   │   │   ├── index.js
    │   │   │   └── index.scss
    │   │   ├── Theater
    │   │   │   ├── index.js
    │   │   │   └── index.scss
    │   │   ├── Top
    │   │   │   ├── index.js
    │   │   │   └── index.scss
    │   │   └── common.scss
    │   |
    │   ├── routes.js  客户端路由配置
    |   |
    │   └── store
    │       ├── index.js
    │       ├── reducers
    │       │   ├── index.js
    │       │   └── topMovies.js
    │       └── types.js
    |
    ├── entry-client.js   客户端渲染入口
    ├── entry-server.js   服务端渲染入口
    └── index.template.html
```