// This component incorporates the Chart.js library to display a line graph showing statistics form the past four
// NHL seasons. Up to five NHL players can be shown in the graph at once for comparison purposes. Additionally,
// the statistic displayed can be changed to show goals, assists, games started, etc.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import Chart from 'chart.js';

export default class Timeline extends Component {

	// constructor(...args) {
	// 	super(...args);

	// 	this.state = { hockeyPlayers: [] };
	// }

	// componentWillMount() {
	// 	ajax('G E T   U R L   F R O M   M I T C H').then((timelineData) => {
	// 		this.setState( {hockeyPlayers: timelineData} )
	// 	});
	// }

	// var data = {};
	// var option = {};
	// var ctx = document.getElementById('timelineChart').getConext('2d');
	// var myChart = new Chart(ctx).Line(data, option);

	render() {
		return (
			<div className="timeline">

				<p>Player Timeline Graph</p>
				<canvas id="timelineChart" width="600" height="600">
				</canvas>
			
			</div>
		)
	}
}