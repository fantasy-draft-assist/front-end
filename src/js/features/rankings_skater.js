// This component shows a ranking of all NHL players based on the app's proprietary ranking algorithm,
// combined with the user's league settings.
// Rankings can be displayed to show all players or rankings by individual positions.

import React, { Component } from 'react';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';
import Cookie from 'js-cookie';
import Icon from '../miscellaneous/icon';

export default class RankingsSkater extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [], filter: null, settings: {} };
	}

	// When the component mounts
	componentWillMount() {
		let { page } = this.props.params;
		let pageUp = (page * 1) + 1;
		console.log('Page is', page);
		console.log('Page + 1 is', pageUp);
		ajax({
			url: `https://hockeydoctor.herokuapp.com/players/index/2015/goals/${page}`,
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
			console.log('Settings after Ajax', this.state.settings);
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
				<td className="checkbox-image">
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
		hashHistory.push(`/side_by_skater/${comparisonData.forComparison[0]}/${comparisonData.forComparison[1]}`);
	}

	// Function called on button click to store playerID, pass that info along to a different component, and then render that component.
	chartHandler(comparisonData) {
		console.log('At chartHandler =>', comparisonData)
		hashHistory.push(`/timeline_skater/${comparisonData.forComparison[0]}/${comparisonData.forComparison[1]}`);
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

		// array of setting names we want.
		let settings = Object.keys(this.state.settings)
			.filter(setting => this.state.settings[setting])
			.filter(setting => firstPlayer && firstPlayer.player_stats[setting]);

		console.log('settings', settings);

		return settings;
	}

	pageDownHandler() {
		let { page } = this.props.params;
		let pageMinusOne = (page * 1) - 1;
		console.log('page and minus', page, pageMinusOne);
		hashHistory.push(`/rankings_skater/${pageMinusOne}`);
	}

	pageUpHandler() {
		let { page } = this.props.params;
		let pagePlusOne = (page * 1) + 1;
		console.log('page and plus', page, pagePlusOne);
		hashHistory.push(`/rankings_skater/${pagePlusOne}`);
	}

	render() {
		let settings = this.getSettings();
		return (
			<div className="rankings-skater">
				<SSF className="top-form" onData={::this.stateUpdateHandler}>
					<span className="stat-year">
						Sort By Scoring Category & Season
					</span>
					<select className="select-stat" name="stat">
						<option>Choose a Scoring Category</option>
						<option value="goals">Goals</option>
						<option value="assists">Assists</option>
						<option value="points">Points</option>
						<option value="powerplay_goals">Powerplay Goals</option>
						<option value="powerplay_assists">Powerplay Assists</option>
						<option value="powerplay_points">Powerplay Points</option>
						<option value="shorthanded_goals">Shorthanded Goals</option>
						<option value="shorthanded_assists">Shorthanded Assists</option>
						<option value="shorthanded_points">Shorthanded Points</option>
						<option value="game_winning_goals">Game Winning Goals</option>
						<option value="plus_minus">Plus / Minus</option>
						<option value="penalty_minutes">Penalty Minutes</option>
						<option value="shots_on_goal">Shots On Goal</option>
						<option value="faceoffs_won">Faceoffs Won</option>
						<option value="faceoffs_lost">Faceoffs Lost</option>
						<option value="hits">Hits</option>
						<option value="blocks">Blocks</option>
					</select>
					<select className="select-year" name="year">
						<option>Pick a Season</option>
						<option value="2012">2012-13</option>
						<option value="2013">2013-14</option>
						<option value="2014">2014-15</option>
						<option value="2015">2015-16</option>
					</select>
					<button className="stat-year-button">Check It Out</button>
				</SSF>
					<div className='hide-this'>
						<button onClick={::this.pageDownHandler}>
							<Icon type='fa fa-arrow-left' />
						</button>
						<button onClick={::this.pageUpHandler}>
							<Icon type='fa fa-arrow-right' />
						</button>
					</div>
				<SSF onData={::this.changeComponentHandler} className="table-form">
					<div className="filter-by-position">
						<span className="filter-text">
							Filter Statistics By Skater Position
						</span>
						<select className="position-selector" onChange={::this.setFilter}>
							<option>Sort Rankings By Position</option>
							<option value=''>All Positions</option>
							<option value='LW'>Left Wing</option>
							<option value='RW'>Right Wing</option>
							<option value='C'>Center</option>
							<option value='D'>Defenseman</option>
						</select>
					</div>
					<div className="player-rankings">
						<table>
							<thead>
								<tr>
									<th></th>
									<th></th>
									<th></th>

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
					<div className="comparison-text">
						Select Two Skaters To Compare
					</div>
					<div className="sbs-graph">
						<button onClick={() => this.action = 'not chart'}>View Side By Side</button>
						<button onClick={() => this.action = 'chart'}>View Stat Graph</button>
					</div>
				</SSF>
			</div>
		)
	}
}