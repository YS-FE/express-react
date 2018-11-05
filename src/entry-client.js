import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';

import App from "./client/App";
import generatorStore from './client/store';

const store = generatorStore(window.REDUX_STATE)
const jsx = (
    <Provider store={ store }>
        <Router>
            <App/>
        </Router>
    </Provider> 
);
ReactDOM.hydrate(jsx, document.getElementById("root"));


// 热更新
if (module.hot) {
  module.hot.accept("./client/App.js", () => {
    const App = require("./client/App").default;
    const jsx = (
      <Provider store={ store }>
          <Router>
              <App/>
          </Router>
      </Provider> 
    );

    ReactDOM.hydrate(jsx, document.getElementById("root"));
  });
}
