// This component incorporates the Chart.js library to display a line graph showing statistics form the past four
// NHL seasons. Up to five NHL players can be shown in the graph at once for comparison purposes. Additionally,
// the statistic displayed can be changed to show goals, assists, games started, etc.

import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import { ajax } from'jquery';
import Cookie from 'js-cookie';


export default class TimelineSkater extends Component {

	constructor(props) {
		super(props);
	};





	componentWillMount() {
		let { idA, idB } = this.props.params;
		ajax({
			url: `https://hockeydoctor.herokuapp.com/players/one/${idA}`,
			headers: { Internal: Cookie.get('currentUser') }
			}).then(player1 => {

			let { playersBeingCompared } = this.state;
			playersBeingCompared.push(player1);

			this.setState( { playersBeingCompared } );
		}).then(
			ajax({
			url: `https://hockeydoctor.herokuapp.com/players/one/${idB}`,
			headers: { Internal: Cookie.get('currentUser') }
			}).then(player2 => {
				let { playersBeingCompared } = this.state;
				playersBeingCompared.push(player2);
				this.setState( { playersBeingCompared} );
				console.log('After Ajax the state is =>', playersBeingCompared)
			})
		)
	}





	componentDidMount() {

	var data = {
			labels: ["2012-13", "2013-14", "2014-15", "2015-16"],
			dataSets: [
				{
					label: "Data 1",
					fillColor: "#5B90BF",
					strokeColor: "#5B90BF",
					pointColor: "#5B90BF",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "#5B90BF",
					data: [43, 40, 50, 45]
				},
				{
					label: "Data 2",
					fillColor: "#5B90BF",
					strokeColor: "#5B90BF",
					pointColor: "#5B90BF",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "#5B90BF",
					data: [39, 35, 27, 40]
				}
			]
		};

		var options = [];
		let ctx = this.canvas.getContext("2d");
		let myLineChart = Chart.Line(ctx, {
			data: data,
			options: options
		});
	}





	render() {
		return (
			<div className="timeline-skater">
				<div>
					<canvas ref={canvas => this.canvas = canvas} width="500" height="500"></canvas>
				</div>
			</div>
		)
	}
}