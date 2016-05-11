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
				<li><img src={datum.player.headshot_url} alt={`{datum.player.first_name} {datum.player.last_name}`} title={`${datum.player.first_name} ${datum.player.last_name}`}height="200" width="150" /></li>
				<li key={datum.player.yahoo_player_id}>{datum.player.first_name} {datum.player.last_name}</li>
				<li>{datum.player.uniform_number}</li>
				<li>{datum.player.positions[0]} | {datum.player.positions[1]}</li>
				<li>{datum.stats[0].goals} Goals</li>
				<li>{datum.stats[0].assists} Assists</li>
				<li>{datum.stats[0].points} Points</li>
				<li>{datum.stats[0].powerplay_goals} Powerplay Goals</li>
				<li>{datum.stats[0].powerplay_assists} Powerplay Assists</li>
				<li>{datum.stats[0].powerplay_points} Powerplay Points</li>
				<li>{datum.stats[0].shorthanded_goals} Shorthanded Goals</li>
				<li>{datum.stats[0].shorthanded_assists} Shorthanded Assists</li>
				<li>{datum.stats[0].shorthanded_points} Shorthanded Points</li>
				<li>{datum.stats[0].game_winning_goals} Game-Winning Goals</li>
				<li>{datum.stats[0].plus_minus} Plus / Minus</li>
				<li>{datum.stats[0].penalty_minutes} Penalty Minutes</li>
				<li>{datum.stats[0].shots_on_goal} Shots On Goal</li>
				<li>{datum.stats[0].faceoffs_won} Faceoffs Won</li>
				<li>{datum.stats[0].faceoffs_lost} Faceoffs Lost</li>
				<li>{datum.stats[0].shot_percentage} Shot Percentage</li>
				<li>{datum.stats[0].hits} Hits</li>
				<li>{datum.stats[0].blocks} Blocks</li>	
			</ul>
			)
		)
	}
	
	render() {
		return(
			<div className="side-by-skater">
				<div className="two-sides">
					{::this.getSBSPlayers()}
				</div>
			</div>
		)
	}
}