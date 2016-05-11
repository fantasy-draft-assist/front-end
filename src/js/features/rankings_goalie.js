// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';
import Cookie from 'js-cookie';

export default class RankingsGoalie extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [], filter: null };
	}

	// When the component mounts
	componentWillMount() {
		ajax({
			url: 'https://hockeydoctor.herokuapp.com/players/index/2015/wins/1',
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
			data = data.filter(hockeyPlayer => hockeyPlayer.player.positions[0] === this.state.filter || hockeyPlayer.player.positions[1] === this.state.filter || hockeyPlayer.player.positions[2] === this.state.filter);
		}
		return data.map(hockeyPlayer => (
			<tr key={hockeyPlayer.yahoo_player_id} className="interpolated-table-rows">
				<td>
					<input type="checkbox" name="forComparison" value={hockeyPlayer.player.yahoo_player_id}></input>
					&nbsp;
					&nbsp;
					<img src={hockeyPlayer.player.headshot_url} alt={`${hockeyPlayer.player.first_name} ${hockeyPlayer.player.last_name}`} title={`${hockeyPlayer.player.first_name} ${hockeyPlayer.player.last_name}`} />
				</td>
				<td>{hockeyPlayer.player.first_name} {hockeyPlayer.player.last_name}</td>
				<td>{`${hockeyPlayer.pro_team.abbreviation} - #${hockeyPlayer.player.uniform_number}`}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.wins}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.losses}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.shutouts}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.saves}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.save_percentage}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.goals_against}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.goals_against_average}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.shots_against}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.games_started}</td>
				<td className="50-pixels-wide">{hockeyPlayer.player_stats.minutes_played}</td>
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
			<div className="rankings-goalie">
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
					</select>
					<button>Check It Out</button>
				</SSF>
				<SSF onData={::this.changeComponentHandler} className="table-form">
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
									<th>Team & Number</th>
									<th className="50-pixels-wide" alt="Wins" title="Wins">Wins</th>
									<th className="50-pixels-wide" alt="Losses" title="Losses">Losses</th>
									<th className="50-pixels-wide" alt="Shutouts" title="Shutouts">Shutouts</th>
									<th className="50-pixels-wide" alt="Saves" title="Saves">Saves</th>
									<th className="50-pixels-wide" alt="Save Percentage" title="Save Percentage">Save %</th>
									<th className="50-pixels-wide" alt="Goals Against" title="Goals Against">Goals Against</th>
									<th className="50-pixels-wide" alt="Goals Against Average" title="Goals Against Average">GAA</th>
									<th className="50-pixels-wide" alt="Shots Against" title="Shots Against">Shots Against</th>
									<th className="50-pixels-wide" alt="Games Started" title="Games Started">Games Started</th>
									<th className="50-pixels-wide" alt="Minutes Played" title="Minutes Played">Minutes Played</th>
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