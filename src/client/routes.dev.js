import React from 'react';
import Theater from "./component/Theater";
import Top from "./component/Top";
import Search from "./component/Search";

import {getTop} from '../api';

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
