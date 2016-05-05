// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';

const MOCK_DATA = [
	{ pos: 'LW', name: 'A'},
	{ pos: 'LW', name: 'b'},
	{ pos: 'RW', name: 'c'},
	{ pos: 'RW', name: 'd'},
	{ pos: 'C', name: 'e'},
	{ pos: 'C', name: 'ff'},
	{ pos: 'C', name: 'gg'},
	{ pos: 'D', name: 'hh'},
	{ pos: 'LW', name: 'ii'},
	{ pos: 'G', name: 'jj'},
	{ pos: 'G', name: 'kk'},
	{ pos: 'G', name: 'll'}
]

export default class Rankings extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [], filter: null };
	}

	// When the component mounts
	componentWillMount() {
		ajax('https://hockeydoctor.herokuapp.com/players/35/2012').then((hockeyPlayers) => {
			console.log('Hockey Players I Got Back =>',hockeyPlayers);
			this.setState( {hockeyPlayers} );
		});
	}

	setFilter(event) {
		this.setState({filter: event.target.value});
	}

	getData() {
		let data = this.state.hockeyPlayers;
		if (this.state.filter) {
			data = data.filter(hockeyPlayer => hockeyPlayer.Player.positions[0] === this.state.filter || hockeyPlayer.Player.positions[1] === this.state.filter || hockeyPlayer.Player.positions[2] === this.state.filter);
		}
		return data.map(hockeyPlayer => (
			<li>
				<input type="checkbox" value={hockeyPlayer.Player.yahoo_player_id}></input>
				{hockeyPlayer.Player.first_name}
				{hockeyPlayer.Player.last_name}
			</li>
		))
	}


	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	sbsHandler([idA, idB]) {
		console.log(idA, idB)
		hashHistory.push(`/side_by_side/${idA}/${idB}`);
	}


	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	chartHandler(comparisonData) {
		hashHistory.push(`/timeline`);
	}

	// A data handler
	dataHandler(comparisonData) {
		if ( this.action === 'not chart') {
			this.sbsHandler(comparisonData);
		} else {
			this.chartHandler(comparisonData);
		}
	}

	render() {
		return (
			<div className="rankings">
				<p>Player Rankings</p>
				<SSF onData={::this.dataHandler}>
					<select onChange={::this.setFilter}>
						<option>Sort Rankings By Position</option>
						<option value=''>All Positions</option>
						<option value='LW'>Left Wing</option>
						<option value='RW'>Right Wing</option>
						<option value='C'>Center</option>
						<option value='D'>Defenseman</option>
						<option value='G'>Goalie</option>
					</select>
					<div className="player-rankings">
						<ul>
							{this.getData()}
						</ul>
					</div>
					<div>
						<button onClick={() => this.action = 'not chart'}>Side-By-Side Comparison</button>
					</div>
					<div>
						<button onClick={() => this.action = 'chart'}>Graph Comparison</button>
					</div>
				</SSF>
			</div>
		)
	}
}