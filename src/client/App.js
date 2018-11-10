import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

// import routes from "./routes";
import routes from "./routes.dev";

import './assets/css/normalize.css';
import './App.scss';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="app">
						<header className="header">
								<nav className="inner">
										<NavLink to="/" >不朽经典</NavLink>
										<NavLink to="/theater" >最新热映</NavLink>
										<NavLink to="/search" >任性搜索</NavLink>
										<span className="desc">电影排行</span>
								</nav>
						</header>

						<div className="content">
								<Switch>
										{ routes.map( route => <Route key={ route.path } { ...route } /> ) }
								</Switch>
						</div>
				</div>
		);
	}
}

export default App;
