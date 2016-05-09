// This component is intended to provide a brief description of the app and inform users of its capabilities.

import React, { Component } from 'react';

export default class About extends Component {

	render() {
		return(
			<div className="about">
				<h3>About Hockey Doctor</h3>
				<p>This app exists so you can beat your friends 
				in fantasy hockey. It is not inended to be used as a betting 
				or gambling website. We do not endorse betting or gambling 
				on fantasy hockey or any other fantasy sporting league. Instead, 
				we seek to provide specified hockey statistics based on a 
				proprietary algorithm. We hope that you will use the info on 
				this website as intended to beat your friends in fantasy hockey 
				and earn the kind of victory that no dollar amount can match: 
				bragging rights.</p>
			</div>
		)
	}
}