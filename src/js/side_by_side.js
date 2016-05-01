import React, { Component } from 'react';
import { ajax } from 'jquery';

export default class SideBySide extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [] };
	}

	componentWillMount() {
		ajax('G E T   U R L   F R O M   M I T C H').then((sbsData) => {
			this.setState( {hockeyPlayers: sbsData} )
		});
	}
	
	render() {
		return(
			<div className="side-by-side">

				<p>Side By Side Player Comparison</p>
			
			</div>
		)
	}
}