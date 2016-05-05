// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { hashHistory, IndexRoute, Link, Route, Router } from 'react-router';

import Main from './main';
import Signup from './login_signup/signup';
import Login from './login_signup/login';
import WithNavs from './with_navs';
import Home from './home';
import About from './about';
import LeagueSettings from './league_settings';
import AccountSettings from './account_settings';
import MockDraft from './mock_draft';
import Rankings from './rankings';
import Timeline from './timeline';
import SideBySide from './side_by_side';


// Below is the general route structure of the app, as written using the React Router.
render ((
	<Router history={ hashHistory }>
		<Route path="/" component={ Main }>
			<IndexRoute component={ Login } />
			<Route path="/signup" component={ Signup } />
			<Route path="/home" component={ WithNavs }>
				<IndexRoute component={ Home } />
				<Route path="/about" component={ About } />
				<Route path="/league_settings" component={ LeagueSettings } />
				<Route path="/account_settings" component={ AccountSettings } />
				<Route path="/mock_draft" component={ MockDraft } />
				<Route path="/rankings" component={ Rankings } />
				<Route path="/timeline" component={ Timeline } />
				<Route path="/side_by_side/:side_a/:side_b" component={ SideBySide } />
			</Route>
		</Route>
	</Router>
	), document.querySelector('.app')
)

			