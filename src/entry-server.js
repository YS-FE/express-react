import React from "react";
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import {StaticRouter, matchPath} from 'react-router-dom';

import App from "./client/App";
import  generatorStore  from './client/store';
import routes from './client/routes';
import {getTop} from './api';
import config from '../config';

const store = generatorStore();

module.exports = async (context) => {

  // 仅仅首页进行预先获取数据
  if (context.currURL === config.indexPath) {
    let data = await getTop();

    await store.dispatch({
      type: 'ADD_TOP_MOVIES',
      value: data && data.subjects
    });

    context.state = store.getState();
  }

    /**
   * 多个路由都需要预先获取数据 参考如下代码
  
    const promises = [];
    routes.some(route => {
      const match = matchPath(req.path, route);
      if (match && route.loadData) promises.push(route.loadData(match));
      return match;
    });

    //将数据设置到store
    let datas = await Promise.all(promises);

    if (datas.length) {
     await store.dispatch({
        type: topMoviesTypes.ADD_TOP_MOVIES,
        value: (datas[0]).subjects
      });
    }
  */


  return (
    // <Loadable.Capture report={moduleName => context.modules.push(moduleName)}>
      <Provider store={store}>
          <StaticRouter location={context.srcUrl} context={context}>
            <App />
          </StaticRouter>
      </Provider>
    // </Loadable.Capture>
  );
}
