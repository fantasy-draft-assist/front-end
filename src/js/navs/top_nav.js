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

				<ul>
					<Link to="/mock_draft">
						<li>Mock Draft</li>
					</Link>
					<Link to="/rankings">
						<li>Player Rankings</li>
					</Link>
				</ul>

				<ul>
					<Link to="/league_settings">
						<li>Settings</li>
					</Link>
					<Link to="/account_settings">
						<li>Account</li>
					</Link>
					<li onClick={this.clickHandler}>Logout</li>
				</ul>

			</div>
		)
	}
}