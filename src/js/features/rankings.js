// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';
import Cookie from 'js-cookie';

export default class Rankings extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [], filter: null };
	}

	// When the component mounts
	componentWillMount() {
		ajax({
			url: 'https://hockeydoctor.herokuapp.com/players/index/2015/goals/1',
			headers: { Internal: Cookie.get('currentUser') }
			}).then((hockeyPlayers) => {
			console.log('Hockey Players I Got Back =>',hockeyPlayers);
			// console.log('Mitch test =>', hockeyPlayers[0].pro_player[0].player_stat)
			this.setState( {hockeyPlayers} );
		});
	}

	setFilter(event) {
		this.setState({filter: event.target.value});
	}

	getData() {
		let data = this.state.hockeyPlayers;
		if (this.state.filter) {
			data = data.filter(hockeyPlayer => hockeyPlayer.positions[0] === this.state.filter || hockeyPlayer.positions[1] === this.state.filter || hockeyPlayer.positions[2] === this.state.filter);
		}
		return data.map(hockeyPlayer => (
			<tr key={hockeyPlayer.yahoo_player_id}>
				<td>
					<input type="checkbox" name="forComparison" value={hockeyPlayer.player.yahoo_player_id}></input>
				</td>
				<td>{hockeyPlayer.player.first_name} {hockeyPlayer.player.last_name}</td>
				<td>{hockeyPlayer.player_stats.goals}</td>
			</tr>
			)
		)
	}


	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	sbsHandler(comparisonData) {
		console.log('At sbsHandler =>', comparisonData)
		console.log(comparisonData)
		hashHistory.push(`/side_by_side/${comparisonData.forComparison[0]}/${comparisonData.forComparison[1]}`);
	}


	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	chartHandler(comparisonData) {
		console.log('At chartHandler =>', comparisonData)
		hashHistory.push(`/timeline/${comparisonData.forComparison[0]}/${comparisonData.forComparison[1]}`);
	}

	// A data handler
	changeComponentHandler(comparisonData) {
		console.log('At dataHandler =>', comparisonData);
		if ( this.action === 'not chart') {
			this.sbsHandler(comparisonData);
		} else {
			this.chartHandler(comparisonData);
		}
	}

	stateUpdateHandler(yearAndStat) {
		console.log('At stateUpdateHandler =>', yearAndStat);
		ajax({
			type: 'GET',
			url: `https://hockeydoctor.herokuapp.com/players/index/${yearAndStat.year}/${yearAndStat.stat}/1`,
			headers: { Internal: Cookie.get('currentUser') }
		}).then(hockeyPlayers => {
			console.log('I got back', hockeyPlayers);
			console.log('this is', this);
			this.setState( { hockeyPlayers: hockeyPlayers} )
			}
		)
	}

	render() {
		return (
			<div className="rankings">
				<p>Player Rankings</p>
				<SSF onData={::this.stateUpdateHandler}>
					<select name="year">
						<option>Pick a Season</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
					</select>
					<select name="stat">
						<option>Choose a Scoring Category</option>
						<option value="goals">Goals</option>
						<option value="assists">Assists</option>
						<option value="points">Points</option>
						<option value="plus_minus">Plus / Minus</option>
						<option value="penalty_minutes">Penalty Minutes</option>
						<option value="powerplay_goals">Powerplay Goals</option>
						<option value="powerplay_assists">Powerplay Assists</option>
						<option value="powerplay_points">Powerplay Points</option>
						<option value="shorthanded_goals">Shorthanded Goals</option>
						<option value="shorthanded_assists">Shorthanded Assists</option>
						<option value="shorthanded_points">Shorthanded Points</option>
						<option value="game_winning_goals">Game Winning Goals</option>
						<option value="shots_on_goal">Shots On Goal</option>
						<option value="faceoffs_won">Faceoffs Won</option>
						<option value="faceoffs_lost">Faceoffs Lost</option>
						<option value="games_started">Games Started</option>
						<option value="wins">Wins</option>
						<option value="losses">Losses</option>
						<option value="goals_against">Goals Against</option>
						<option value="goals_against_average">Goals Against Average</option>
						<option value="shots_against">Shots Against</option>
						<option value="saves">Saves</option>
						<option value="save_percentage">Save Percentage</option>
						<option value="shutouts">Shutouts</option>
						<option value="minutes_played">Minutes Played</option>
						<option value="hits">Hits</option>
						<option value="blocks">Blocks</option>
					</select>
					<button>Apply the filter</button>
				</SSF>
				<SSF onData={::this.changeComponentHandler}>
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
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Goals</th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.getData()}
							</tbody>
						</table>
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

