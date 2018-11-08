import React from "react";
import ReactDOM from "react-dom";
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from "./client/App";
import generatorStore from './client/store';

const store = generatorStore(window.REDUX_STATE);

const render = (component) => {
    const modules = [];
    const jsx = (
        // <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={ store }>
                <Router>
                    <component/>
                </Router>
            </Provider> 
        // </Loadable.Capture>
    );
    
    Loadable.preloadReady().then(() => {
       ReactDOM.hydrate(jsx, document.getElementById("root"));
    });  
};

render(App);


// 热更新
if (module.hot) {
  module.hot.accept("./client/App.js", () => {
    const App = require("./client/App").default;
    render(App);
  });
}




