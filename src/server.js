const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const proxy = require('http-proxy-middleware');
const logger = require('morgan');
const chalk = require('chalk');
const app = express();



const proxyTables = { // 服务端代理
    '/douban': {
      target: 'http://api.douban.com',
      pathRewrite: {
        '^/douban': ''
      },
      changeOrigin: true,
      log: true
    }
};

Object.keys(proxyTables).forEach(key => {
  app.use(proxy(key, proxyTables[key]));
});

app.set('views', path.join(__dirname, '../dist/'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));

const isProd = process.env.NODE_ENV === "production";

let serverEntry;
let template;
let readyPromise;
if (isProd) {
  serverEntry = require("../dist/entry-server");
  template = fs.readFileSync("./dist/index.html", "utf-8");

  // 静态资源映射到dist路径下
  app.use("/dist", express.static(path.join(__dirname, "../dist")));

} else {
  readyPromise = require("./setup-dev-server")(app, (entry, htmlTemplate) => {
    serverEntry = entry;
    template = htmlTemplate;
  });
}


app.use("/public", express.static(path.join(__dirname, "../public")));

const render =  async (req, res) => {
  let context = {
    currURL: req.url
  };

  let html = ReactDOMServer.renderToString(await serverEntry(context));
  // let htmlStr = template.replace("<!--react-ssr-outlet-->", `<div id='app'>${html}</div>`);
  // 将渲染后的html字符串发送给客户端
  // res.send(htmlStr);

  res.render('index', {
    root: html,
    state: context.state
  });
}

app.get("*", isProd ? render : (req, res) => {
  // 等待客户端和服务端打包完成后进行render
	readyPromise.then(() => render(req, res));
});


app.listen(3000, () => {
  console.log(chalk.green("\n ✈️ ✈️ server listening on 3000, open http://localhost:3000 in your browser"));
});

