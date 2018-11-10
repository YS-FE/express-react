import React from 'react';
import Loadable from 'react-loadable';
import {getTop} from '../api';

const Loading=(props)=>{
    return <div>Loading...</div>
}

const Theater = Loadable({
    loader: () => import(/* webpackChunkName: "theater" */ "./component/Theater"),
    loading: Loading,
    delay: 300
});

const Top = Loadable({
    loader: () => import(/* webpackChunkName: "top" */"./component/Top"),
    loading: Loading,
    delay: 300
});

const Search = Loadable({
    loader: () => import(/* webpackChunkName: "search" */"./component/Search"),
    loading: Loading,
    delay: 300
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
