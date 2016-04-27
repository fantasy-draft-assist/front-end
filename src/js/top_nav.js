import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TopNav extends Component {

	clickHandler();
	// Make the clickHandler do something.

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
					<Link to="/">
						<li>Account Settings</li>
					</Link>
					<li onClick={this.clickHandler}>Logout</li>
				</ul>
			</div>
		)
	}
}