// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';

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

	componentWillMount() {
		ajax('https://hockeydoctor.herokuapp.com/players/35/2012').then((movesLikeJagr) => {
			console.log('Jaromir Jagr =>',movesLikeJagr);
			// this.setState( {hockeyPlayers: rankingsData} )
		});
	}

	setFilter(event) {
		this.setState({filter: event.target.value});
	}

	getData() {
		let data = MOCK_DATA;
		if (this.state.filter) {
			data = data.filter(x => x.pos === this.state.filter);
		}
		return data.map(x => (
			<li>
				<input type="checkbox"></input>
				{x.name}
			</li>
		))
	}

	render() {
		return (
			<div className="rankings">

				<p>Player Rankings</p>

					<select onChange={::this.setFilter}>
						<option>See Rankings By Position</option>
						<option value=''>All</option>
						<option value='LW'>Left Wing</option>
						<option value='RW'>Right Wing</option>
						<option value='C'>Center</option>
						<option value='D'>Defenseman</option>
						<option value='G'>Goalie</option>
					</select>

				<div className="RANKINGS WILL GO IN HERE // CHANGE THIS CLASSNAME">
					<ul>
						{this.getData()}
					</ul>
				</div>
			
			</div>
		)
	}
}

	// generateRankings(hockeyPlayer) {
	// 	return (
	// 		hockeyPlayer.name
	// 		hockeyPlayer.team
	// 		hockeyPlayer.position
	// 		hockeyPlayer.goals
	// 		hockeyPlayer.assists
	// 	)
	// }