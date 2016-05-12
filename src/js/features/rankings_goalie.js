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

		this.state = { hockeyPlayers: [], filter: null, settings: {} };
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

		ajax({
			url: 'https://hockeydoctor.herokuapp.com/settings',
			headers: { Internal: Cookie.get('currentUser') }
			}).then((settings) => {
			this.setState( {settings} );
		});
	}

	setFilter(event) {
		this.setState({filter: event.target.value});
	}

	getData() {
		let data = this.state.hockeyPlayers;
		let settings = this.getSettings();
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
				
				{settings.map(setting => (
					<td key={setting} className="50-pixels-wide">{hockeyPlayer.player_stats[setting]}</td>
				))}
			</tr>
			)
		)
	}


	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	sbsHandler(comparisonData) {
		console.log('At sbsHandler =>', comparisonData)
		console.log(comparisonData)
		hashHistory.push(`/side_by_goalie/${comparisonData.forComparison[0]}/${comparisonData.forComparison[1]}`);
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

	getSettings() {
		// just grab first player to check for null values
		let firstPlayer = this.state.hockeyPlayers[0];

		// array od setting names we want.
		let settings = Object.keys(this.state.settings)
			.filter(setting => this.state.settings[setting])
			.filter(setting => firstPlayer && firstPlayer.player_stats[setting]);

		console.log('settings', settings);

		return settings;
	}

	render() {

		let settings = this.getSettings();


		return (
			<div className="rankings-goalie">
				<SSF onData={::this.stateUpdateHandler}>
					<select name="year">
						<option>Pick a Season</option>
						<option value="2012">2012-13</option>
						<option value="2013">2013-14</option>
						<option value="2014">2014-15</option>
						<option value="2015">2015-16</option>
					</select>
					<select name="stat">
						<option>Choose a Scoring Category</option>
						<option value="wins">Wins</option>
						<option value="Losses">Losses</option>
						<option value="shutouts">Shutouts</option>
						<option value="saves">Saves</option>
						<option value="save_percentage">Save Percentage</option>
						<option value="goals_against">Goals Against</option>
						<option value="goals_against_average">Goals Against Average</option>
						<option value="shots_against">Shots Against</option>
						<option value="games_started">Games Started</option>
						<option value="minutes_played">Minutes Played</option>
					</select>
					<button>Check It Out</button>
				</SSF>
				<SSF onData={::this.changeComponentHandler} className="table-form">
					{/*<select onChange={::this.setFilter}>
						<option>Sort Rankings By Position</option>
						<option value=''>All Positions</option>
						<option value='LW'>Left Wing</option>
						<option value='RW'>Right Wing</option>
						<option value='C'>Center</option>
						<option value='D'>Defenseman</option>
						<option value='G'>Goalie</option>
					</select>*/}
					<div className="player-rankings">
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Team & Number</th>

									{settings.map(setting => {
										name = setting.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
										return <th key={setting} className="50-pixels-wide" alt={name} title={name}>{name}</th>
									})}
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