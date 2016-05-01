import React, { Component } from 'react';
import { ajax } from 'jquery';
import Chart from 'chart.js';

export default class Timeline extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [] };
	}

	componentWillMount() {
		ajax('G E T   U R L   F R O M   M I T C H').then((timelineData) => {
			this.setState( {hockeyPlayers: timelineData} )
		});
	}

	render() {
		return (
			<div className="timeline">

				<p>Player Timeline Graph</p>
				<canvas>
				</canvas>
			
			</div>
		)
	}
}