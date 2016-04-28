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
					<Link to="/about">
						<li>About APP NAME HERE</li>
					</Link>
					<Link to="/league_settings">
						<li>League Settings</li>
					</Link>
					<Link to="/account_settings">
						<li>Account Settings</li>
					</Link>
					<li onClick={this.clickHandler}>Logout</li>
				</ul>
			</div>
		)
	}
}