// This component incorporates the Chart.js library to display a line graph showing statistics form the past four
// NHL seasons. Up to five NHL players can be shown in the graph at once for comparison purposes. Additionally,
// the statistic displayed can be changed to show goals, assists, games started, etc.

import React, { Component } from 'react';
import { Link } from 'react-router';
import Chart from 'chart.js';
import { ajax } from'jquery';
import Cookie from 'js-cookie';


export default class TimelineGoalie extends Component {

	constructor(props) {
		super(props);

		this.state = { playersBeingCompared: [], data:{} };
	};





	componentDidMount() {
		let { idA, idB } = this.props.params;
		// ajax({
		// 	url: `https://hockeydoctor.herokuapp.com/players/one/${idA}`,
		// 	headers: { Internal: Cookie.get('currentUser') }
		// 	}).then(player1 => {

		// 	let { playersBeingCompared } = this.state;
		// 	playersBeingCompared.push(player1);

		// 	this.setState( { playersBeingCompared } );
		// }).then(
		// 	ajax({
		// 	url: `https://hockeydoctor.herokuapp.com/players/one/${idB}`,
		// 	headers: { Internal: Cookie.get('currentUser') }
		// 	}).then(player2 => {
		// 		let { playersBeingCompared } = this.state;
		// 		playersBeingCompared.push(player2);
		// 		this.setState( { playersBeingCompared} );
		// 		console.log('After Ajax the state is =>', playersBeingCompared)
		// 	})
		// )

		// let playerOne = this.state.playersBeingCompared[0];
		// let playerTwo = this.state.playersBeingCompared[1];
		// console.log(playerOne);
		// let p0G = this.state.playersBeingCompared[0].stats[0].goals;
		// let p1G = this.state.playersBeingCompared[1].stats[0].goals;

		var data = {
			labels: ["2012-13", "2013-14", "2014-15", "2015-16"],
			datasets: [
				{
					label: /*"{`${playerOne.player.first_name} ${playerOne.player.last_name}`}",*/ "First Player",
					fillColor: "yellow",
					strokeColor: "yellow",
					pointColor: "yellow",
					pointStrokeColor: "#ccc",
					pointHighlightFill: "#ccc",
					pointHighlightStroke: "yellow",
					/*data: [ {playerOne.stats[0].goals}, {playerOne.stats[1].goals}, {playerOne.stats[2].goals}, {playerOne.stats[3].goals} ]*/
					data: [45, 20, 51, 32]
				},
				{
					label: /*"{`${playerTwo.player.first_name} ${playerTwo.player.last_name}`}",*/"Second Player",
					fillColor: "blue",
					strokeColor: "blue",
					pointColor: "blue",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "blue",
					/*data: [ {playerTwo.stats[0].goals}, {playerTwo.stats[1].goals}, {playerTwo.stats[2].goals}, {playerTwo.stats[3].goals} ]*/
					data: [29, 47, 32, 44]
				}
			]
		};

		// var myNewChart = new Chart(ctx , {
		//     type: "line",
		//     data: dat, 
		// });


		var options = {showLines: "true"};

		let ctx = this.canvas.getContext("2d");
		// let ctx = document.querySelector('#myChart').getContext("2d");
		let myLineChart = new Chart(ctx, {
			type: "line",
			data: data,
			options: options
		});
		// let myLineChart = new Chart(ctx, {
		// 	type: "line",
		// 	data: {
		// 		datasets: [{
		// 			label: "label",
		// 			data: [0,1,2,4]
		// 		}]},
		// 	options: options
		// });

	}





	render() {
		return (
			<div className="timeline-goalie">
				<div className="chart-area">
					<canvas id="myChart" ref={canvas => this.canvas = canvas} width="500" height="500"></canvas>
				</div>
			</div>
		)
	}
}

// // This component incorporates the Chart.js library to display a line graph showing statistics form the past four
// // NHL seasons. Up to five NHL players can be shown in the graph at once for comparison purposes. Additionally,
// // the statistic displayed can be changed to show goals, assists, games started, etc.

// import React, { Component } from 'react';
// import { Link } from 'react-router';
// import Chart from 'chart.js';
// import { ajax } from'jquery';
// import Cookie from 'js-cookie';


// export default class TimelineSkater extends Component {

// 	constructor(props) {
// 		super(props);

// 		this.state = { playersBeingCompared: [], data:{} };
// 	};





// 	componentDidMount() {
// 		let { idA, idB } = this.props.params;
// 		ajax({
// 			url: `https://hockeydoctor.herokuapp.com/players/one/${idA}`,
// 			headers: { Internal: Cookie.get('currentUser') }
// 			}).then(player1 => {

// 			let { playersBeingCompared } = this.state;
// 			playersBeingCompared.push(player1);

// 			this.setState( { playersBeingCompared } );
// 		}).then(
// 			ajax({
// 			url: `https://hockeydoctor.herokuapp.com/players/one/${idB}`,
// 			headers: { Internal: Cookie.get('currentUser') }
// 			}).then(player2 => {
// 				let { playersBeingCompared } = this.state;
// 				playersBeingCompared.push(player2);
// 				this.setState( { playersBeingCompared} );
// 				console.log('After Ajax the state is =>', playersBeingCompared)
// 			})
// 		)

// 		let playerOne = this.state.playersBeingCompared[0];
// 		let playerTwo = this.state.playersBeingCompared[1];
// 		console.log(playerOne);
// 		let p0G = this.state.playersBeingCompared[0].stats[0].goals;
// 		let p1G = this.state.playersBeingCompared[1].stats[0].goals;

// 		var data = {
// 			labels: ["2012-13", "2013-14", "2014-15", "2015-16"],
// 			datasets: [
// 				{
// 					label: "{`${playerOne.player.first_name} ${playerOne.player.last_name}`}",
// 					fillColor: "#003e7e",
// 					strokeColor: "#003e7e",
// 					pointColor: "#003e7e",
// 					pointStrokeColor: "#ccc",
// 					pointHighlightFill: "#ccc",
// 					pointHighlightStroke: "#003e7e",
// 					/*data: [ {playerOne.stats[0].goals}, {playerOne.stats[1].goals}, {playerOne.stats[2].goals}, {playerOne.stats[3].goals} ]*/
// 					data: [p0G, p0G, p0G, p0G]
// 				},
// 				{
// 					label: "{`${playerTwo.player.first_name} ${playerTwo.player.last_name}`}",
// 					fillColor: "#ffc422",
// 					strokeColor: "#ffc422",
// 					pointColor: "#ffc422",
// 					pointStrokeColor: "#fff",
// 					pointHighlightFill: "#fff",
// 					pointHighlightStroke: "#ffc422",
// 					/*data: [ {playerTwo.stats[0].goals}, {playerTwo.stats[1].goals}, {playerTwo.stats[2].goals}, {playerTwo.stats[3].goals} ]*/
// 					data: [p1G, p1G, p1G, p1G]
// 				}
// 			]
// 		};

// 		// var myNewChart = new Chart(ctx , {
// 		//     type: "line",
// 		//     data: dat, 
// 		// });


// 		var options = {showLines: "true"};

// 		let ctx = this.canvas.getContext("2d");
// 		// let ctx = document.querySelector('#myChart').getContext("2d");
// 		let myLineChart = new Chart(ctx, {
// 			type: "line",
// 			data: data,
// 			options: options
// 		});
// 		// let myLineChart = new Chart(ctx, {
// 		// 	type: "line",
// 		// 	data: {
// 		// 		datasets: [{
// 		// 			label: "label",
// 		// 			data: [0,1,2,4]
// 		// 		}]},
// 		// 	options: options
// 		// });

// 	}





// 	render() {
// 		return (
// 			<div className="timeline-skater">
// 				<div className="chart-area">
// 					<canvas id="myChart" ref={canvas => this.canvas = canvas} width="500" height="500"></canvas>
// 				</div>
// 			</div>
// 		)
// 	}
// }