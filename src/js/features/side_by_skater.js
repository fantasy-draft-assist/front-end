// This component is used to compare two NHL players (and their respective statistics) in a side-by-side format.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

export default class SideBySkater extends Component {

	constructor(...args) {
		super(...args);

		this.state = { playersBeingCompared: [] }
	}


// http://hockeydoctor.herokuapp.com/players/one/35/


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


	getSBSPlayers() {
		let twoPlayers = this.state.playersBeingCompared;
		console.log('Got it in the SBSPlayers callbck =>', twoPlayers);
		// if ({twoPlayers.player.uniform_number} === 35) {
		// 	{datum.player.uniform_number} = 69;
		// }
		return twoPlayers.map(datum => (
			<ul>
				<li><img src={datum.player.headshot_url} alt={`{datum.player.first_name} {datum.player.last_name}`} title={`${datum.player.first_name} ${datum.player.last_name}`} /></li>
				<li key={datum.player.yahoo_player_id}>{datum.player.first_name} {datum.player.last_name}</li>
				<li>{datum.player.uniform_number}</li>
				<li>{datum.player.positions[0]}</li>
				<li>{datum.stats[0].goals}</li>
				<li>{datum.stats[0].assists}</li>
				<li>{datum.stats[0].points}</li>
				<li>{datum.stats[0].powerplay_goals}</li>
				<li>{datum.stats[0].powerplay_assists}</li>
				<li>{datum.stats[0].powerplay_points}</li>
				<li>{datum.stats[0].shorthanded_goals}</li>
				<li>{datum.stats[0].shorthanded_assists}</li>
				<li>{datum.stats[0].shorthanded_points}</li>
				<li>{datum.stats[0].game_winning_goals}</li>
				<li>{datum.stats[0].plus_minus}</li>
				<li>{datum.stats[0].penalty_minutes}</li>
				<li>{datum.stats[0].shots_on_goal}</li>
				<li>{datum.stats[0].faceoffs_won}</li>
				<li>{datum.stats[0].faceoffs_lost}</li>
				<li>{datum.stats[0].shot_percentage}</li>
				<li>{datum.stats[0].hits}</li>
				<li>{datum.stats[0].blocks}</li>	
			</ul>
			)
		)
	}
	
	render() {
		let { playersBeingCompared } = this.state;
		console.log('In the render =>', playersBeingCompared);
		return(
			<div className="side-by-skater">
				<div className="two-sides">
					<ul>
						<li>Position</li>
						<li>Goals</li>
						<li>Assists</li>
						<li>Points</li>
						<li>Powerplay Goals</li>
						<li>Powerplay Assists</li>
						<li>Powerplay Points</li>
						<li>Shorthanded Goals</li>
						<li>Shorthanded Assists</li>
						<li>Shorthanded Points</li>
						<li>Game-Winning Goals</li>
						<li>Plus / Minus</li>
						<li>Penalty Minutes</li>
						<li>Shots On Goal</li>
						<li>Faceoffs Won</li>
						<li>Faceoffs Lost</li>
						<li>Shot Percentage</li>
						<li>Hits</li>
						<li>Blocks</li>
					</ul>
					{::this.getSBSPlayers()}
				</div>
			</div>
		)
	}
}