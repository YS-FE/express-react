const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const proxy = require('http-proxy-middleware');
const logger = require('morgan');
const favicon = require('serve-favicon');
const compression = require('compression');
const chalk = require('chalk');
const Loadable = require('react-loadable');
const { getBundles } = require('react-loadable/webpack');

const config = require('./config');
const {apiRouter} = require('./router');

const app = express();


// 配置代理
Object.keys(config.proxyTables).forEach(key => {
  app.use(proxy(key, config.proxyTables[key]));
});


app.use(favicon('./public/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression({ threshold: 0 }))
app.use(logger('dev'));

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/public", express.static(path.join(__dirname, "./public")));

app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');


//接口路由
app.use('/api', apiRouter);

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 8888;
let serverEntry, template, readyPromise, loadableJson;


if (isProd) {
  app.set('views', path.join(__dirname, './dist'));
  loadableJson = require('./dist/react-loadable.json');
  serverEntry = require("./dist/entry-server");
} else {
  app.set('views', path.join(__dirname, './temp'));
  readyPromise = require("./build/setup-dev-server")(app, (entry, htmlTemplate) => {
    serverEntry = entry;
    template = htmlTemplate;
    fs.writeFileSync(path.join(__dirname, '/temp/index.html'), template, "utf8");
  });
}


/**
 * 服务渲染中间件 
 */
const render =  async (req, res) => {
  let scripts = '';
  let context = {
    currURL: req.url,
    modules: []
  };

  let entry = await serverEntry(context);
  let html = ReactDOMServer.renderToString(entry);

  if (isProd) {
    let bundles = getBundles(loadableJson, context.modules);
    scripts = bundles.map(bundle => {
      return `<script src="/dist/${bundle.file}"></script>`
    }).join('\n');
  }

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.render('index', {
      root: html,
      state: context.state,
      scripts: scripts
    });
  }
};

app.get("*", isProd ? render : (req, res) => {
	readyPromise.then(() => render(req, res));
});

const listener = (app, port) => {
  app.listen(port, () => {
    console.log(chalk.green(`\n ✈️ ✈️ server listening on ${port}, open http://localhost:${port} in your browser`));
  });
};

if (isProd) {
  Loadable.preloadAll().then(() => {
    listener(app, port);
  });
} else {
  listener(app, port);
}



