// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-form';

export default class Rankings extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [] };
	}

	componentWillMount() {
		ajax('G E T   U R L   F R O M   M I T C H').then((rankingsData) => {
			this.setState( {hockeyPlayers: rankingsData} )
		});
	}

	generateRankings(hockeyPlayer) {
		return (
			hockeyPlayer.name
			hockeyPlayer.team
			hockeyPlayer.position
			hockeyPlayer.goals
			hockeyPlayer.assists
		)
	}

	render() {
		return (
			<div className="rankings">

				<p>Player Rankings</p>

				<SSF>
					<select>
						<option>See Rankings By Position</option>
						<option></option>
						<option value='lw'>Left Wing</option>
						<option value='rw'>Right Wing</option>
						<option value='c'>Center</option>
						<option value='d'>Defenseman</option>
						<option value='g'>Goalie</option>
					</select>
				</SSF>

				<div className="RANKINGS WILL GO IN HERE // CHANGE THIS CLASSNAME">
				</div>
			
			</div>
		)
	}
}