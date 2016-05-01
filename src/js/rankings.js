import React, { Component } from 'react';
import { ajax } from 'jquery';

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

				<div>
					<ul>
						{hockeyPlayers.map(::this.generateRankings)}
					</ul>
				</div>
			
			</div>
		)
	}
}