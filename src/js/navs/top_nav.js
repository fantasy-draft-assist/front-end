// This component houses the primary navigation for the app.

import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Cookie from 'js-cookie';
import { ajax, ajaxSetup } from 'jquery';

export default class TopNav extends Component {

	clickHandler() {
		Cookie.remove('currentUser');
		ajaxSetup({
			headers: { 'Internal_Auth': '' }
		});
		hashHistory.push('/');
	}

	render() {
		return (
			<div className="top-nav">
				<div className="top-logo">
					<Link to="/home" className="logo">
						Hockey Doctor
					</Link>
				</div>
				<div className="top-links">
					<ul className="top-links-ul">
						<Link to="/mock_draft">
							<li className="top-links-li ">My League</li>
						</Link>
						<Link to="/rankings_skater/1">
							<li className="top-links-li">Skater Rankings</li>
						</Link>
						<Link to="/rankings_goalie">
							<li className="top-links-li">Goalie Rankings</li>
						</Link>
						<Link to="/league_settings">
							<li className="top-links-li">League Settings</li>
						</Link>
						<li onClick={this.clickHandler} className="top-links-li">Logout</li>
					</ul>
				</div>
			</div>
		)
	}
}