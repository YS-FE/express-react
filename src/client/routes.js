import React from 'react';
import Loadable from 'react-loadable';
// import Theater from "./component/Theater";
// import Top from "./component/Top";
// import Search from "./component/Search";

import {getTop} from '../api';

const Theater = Loadable({
    loader: () => import("./component/Theater"),
    loading: <div></div>
});

const Top = Loadable({
    loader: () => import("./component/Top"),
    loading: <div></div>
});

const Search = Loadable({
    loader: () => import("./component/Search"),
    loading: <div></div>
});


export default [
    {
        path: "/",
        component: Top,
        exact: true,
        loadData: () => getTop()
    },
    {
        path: "/theater",
        component: Theater,
        exact: true,
    },
    {
        path: "/search",
        component: Search,
        exact: true,
    }
];
