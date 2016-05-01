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
						<li>Player Ranks</li>
					</Link>
					<Link to="/timeline">
						<li>Historical Data</li>
					</Link>
					<Link to="/side_by_side">
						<li>Side-By-Side Comparison</li>
					</Link>

				</ul>

				<ul>

					<Link to="/about">
						<li>About</li>
					</Link>
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