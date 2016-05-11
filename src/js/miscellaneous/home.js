// This component is rendered when a user loads the website with a valid cookie or upon logging in / signing up.

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {

	render() {
		return (
			<div className="home">
				<div className="message">
					<p>Welcome</p>
					<p>Hope You Like Hockey</p>
				</div>
			</div>
		)
	}
}