// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { hashHistory, indexRoute, Link, Route, Router } from 'react-router';

import Main from './main';
import Login from './login';
import Logout from './logout';
import DeletedAccount from './deleted_account';


render ((
	<Router history={hashHistory} >
		<Route path="/" component={Main}>
			<indexRoute component={Login} />
			<Route path="/signup" component={} />
			<Route path="/logout" component={} />
			<Route path="/deleted_account" component={} />
		</Route>
	</Router>
	), document.querySelector('.app')
)