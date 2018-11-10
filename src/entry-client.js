import React from "react";
import ReactDOM from "react-dom";
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from "./client/App";
import generatorStore from './client/store';

const store = generatorStore(window.REDUX_STATE);

/**
 * 
 * @param {Component} Com 
 * @param {Boolean} isProd 
 */
function render(Com, isProd) {
    const jsx = (
        <Provider store={ store }>
            <Router>
                <Com/>
            </Router>
        </Provider> 
    );

    if (isProd) {
        Loadable.preloadReady().then(() => {
            ReactDOM.hydrate(jsx, document.getElementById("root"));
        });  
    } else {
        ReactDOM.hydrate(jsx, document.getElementById("root"));
    }
}

render(App, true);


// 热更新
if (module.hot) {
  module.hot.accept("./client/App.js", () => {
    const App = require("./client/App").default;
    render(App, false);
  });
}




