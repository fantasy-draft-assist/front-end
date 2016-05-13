// Javascript Entry Point
import React from 'react';
import { render } from 'react-dom';
import { hashHistory, IndexRoute, Link, Route, Router } from 'react-router';

import Main from './component_parents/main';
import Signup from './login_signup/signup';
import Login from './login_signup/login';
import WithNavs from './component_parents/with_navs';
import Home from './miscellaneous/home';
import About from './miscellaneous/about';
import LeagueSettings from './miscellaneous/league_settings';
import AccountSettings from './miscellaneous/account_settings';
import MockDraft from './features/mock_draft';
import RankingsSkater from './features/rankings_skater';
import RankingsGoalie from './features/rankings_goalie';
import TimelineSkater from './features/timeline_skater';
import TimelineGoalie from './features/timeline_goalie';
import SideBySkater from './features/side_by_skater';
import SideByGoalie from './features/side_by_goalie';
import SearchResults from './features/search_results';
import PlayerProfile from './features/player_profile';
import Privacy from './miscellaneous/privacy';
import Legal from './miscellaneous/legal';


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
				<Route path="/privacy" component={ Privacy } />
				<Route path="/legal" component={ Legal } />
				<Route path="/mock_draft" component={ MockDraft } />
				<Route path="/rankings_skater" component={ RankingsSkater } />
				<Route path="/rankings_goalie" component={ RankingsGoalie } />
				<Route path="/timeline_skater/:idA/:idB" component={ TimelineSkater } />
				<Route path="/timeline_goalie/:idA/:idB" component={ TimelineGoalie } />
				<Route path="/search_results/:name" component={ SearchResults } />
				<Route path="/player_profile/:yahooID" component={ PlayerProfile } />
				<Route path="/side_by_skater/:idA/:idB" component={ SideBySkater } />
				<Route path="/side_by_goalie/:idA/:idB" component={ SideByGoalie } />
			</Route>
		</Route>
	</Router>
	), document.querySelector('.app')
)