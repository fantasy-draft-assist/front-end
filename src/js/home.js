// This component is rendered when a user loads the website with a valid cookie or upon logging in / signing up.

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {

	render() {
		return (
			<div className="home">
				<p>Welcome</p>
				<p>If you have not visited our <Link to='/league_settings'>League Settings</Link>page yet, we encourage
				you to do so in order to receive data, statistics and analysis more pertinent to your specific
				fantasy league.</p>
			</div>
		)
	}
}