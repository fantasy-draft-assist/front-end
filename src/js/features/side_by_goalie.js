// This component is used to compare two NHL players (and their respective statistics) in a side-by-side format.
import React, { Component } from 'react';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

export default class SideByGoalie extends Component {
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
		// console.log('Got it in the SBSPlayers callbck =>', twoPlayers);
		// if ({twoPlayers.player.uniform_number} === 35) {
		// 	{datum.player.uniform_number} = 69;
		// }
		return twoPlayers.map(datum => (
			<ul className="stat-numbers">
				<li className="no-fill">
					<img src={datum.player.headshot_url} alt={`{datum.player.first_name} {datum.player.last_name}`} title={`${datum.player.first_name} ${datum.player.last_name}`} width="75" height="100" />
				</li>
				<li className="player-name no-fill" key={datum.player.yahoo_player_id}>{`${datum.player.first_name} ${datum.player.last_name}`}</li>
				<li className="no-fill crazy-li">
					<span className="span-left">
						{datum.player.positions[0]}
					</span>
					<span className="span-middle">
						{datum.pro_team.name}
					</span>
					<span className="span-right">
						{`#${datum.player.uniform_number}`}
					</span>
				</li>
				<li>{datum.stats[0].wins}</li>
				<li>{datum.stats[0].losses}</li>
				<li>{datum.stats[0].goals_against}</li>
				<li>{datum.stats[0].goals_against_average}</li>
				<li>{datum.stats[0].saves}</li>
				<li>{datum.stats[0].save_percentage}</li>
				<li>{datum.stats[0].shutouts}</li>
				<li>{datum.stats[0].shots_against}</li>
				<li>{datum.stats[0].games_played}</li>
				<li>{datum.stats[0].games_started}</li>
				<li>{datum.stats[0].minutes_played}</li>
			</ul>
			)
		)
	}
	
	render() {
		return(
			<div className="side-by-goalie">
				<div className="three-columns">
					<ul>
						<li className="top-left-corner"></li>
						<li>Wins</li>
						<li>Losses</li>
						<li>Goals Against</li>
						<li>Goals Against Average</li>
						<li>Saves</li>
						<li>Save Percentage</li>
						<li>Shutouts</li>
						<li>Shots Against</li>
						<li>Games Played</li>
						<li>Games Started</li>
						<li>Minutes Played</li>
					</ul>
					{this.getSBSPlayers()}
				</div>
			</div>
		)
	}
}