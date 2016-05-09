// This component is used for CRUD.
// Specifically, users can update or delete an account when this component is rendered.

import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';

export default class AccountSettings extends Component {

	// dataHandler(putData) {
	// 	hashHistory.push('/home');
	// }


	// clickHandler() {
	// 	let currentUser = Cookie.getJSON('currentUser');
	// 	console.log('currentUser ->', currentUser)
	// 	ajax({
	// 		url: 'hockeydoctor.herokuapp.com/registration/${currentUser.id}',
	// 		type: 'DELETE',
	// 		cache: false,
	// 		//data: ?????,
	// 		dataType: 'json'
	// 	}).then((response) => {
	// 		Cookie.delete()
	// 	})
	// }

	fillLeagueTeams() {
		let total_options = []
		for (let i = 8; i <= 20; i++) {
			total_options.push(<option value={i}>{i}</option>)
		}
		return total_options;
	}

	fillTeamSkaters() {
		let total_options = []
		for (let i = 1; i <= 23; i++) {
			total_options.push(<option value={i}>{i}</option>)
		}
		return total_options;
	}

	fillTeamGoalies() {
		let total_options = []
		for (let i = 1; i <= 2; i++) {
			total_options.push(<option value={i}>{i}</option>)
		}
		return total_options;
	}

	dataHandler(accountSettingsData) {
		ajax({
			url: '',
			type: 'PUT',
			data: accountSettingsData,
			dataType: 'json',
			cache: false
		}).then(response => {
			//do something here
		})
	}

	render() {
		return (
			<div className="league-settings">
				<SSF onData={this.dataHandler}>
					<div className="teams-skaters-goalies">
						<select className="tsg-options">
							<option>Number of Teams in Your League</option>
							{this.fillLeagueTeams()}
						</select>
						<select className="tsg-options">
							<option>Skaters Per Fantasy Team</option>
							{this.fillTeamSkaters()}
						</select>
						<select className="tsg-options">
							<option>Goalies Per Fantasy Team</option>
							{this.fillTeamGoalies()}
						</select>
					</div>
					<div className="stats">
						<div className="skater-stats">
							Skater Stats
							<br />
							<input type="checkbox" name="goals" />
							&nbsp;
							Goals
							<br />
							<input type="checkbox" name="assists" />
							&nbsp;
							Assists
							<br />
							<input type="checkbox" name="points" />
							&nbsp;
							Points
							<br />
							<input type="checkbox" name="plus_minus" />
							&nbsp;
							Plus / Minus
							<br />
							<input type="checkbox" name="penalty_minutes" />
							&nbsp;
							Penalty Minutes
							<br />
							<input type="checkbox" name="powerplay_goals" />
							&nbsp;
							Powerlay Goals
							<br />
							<input type="checkbox" name="powerplay_assists" />
							&nbsp;
							Powerplay Assists
							<br />
							<input type="checkbox" name="powerplay_points" />
							&nbsp;
							Powerplay Points
							<br />
							<input type="checkbox" name="shorthanded_goals" />
							&nbsp;
							Shorthanded Goals
							<br />
							<input type="checkbox" name="shorthanded_assists" />
							&nbsp;
							Shorthanded Assists
							<br />
							<input type="checkbox" name="shorthanded_points" />
							&nbsp;
							Shorthanded Points
							<br />
							<input type="checkbox" name="game_winning_goals" />
							&nbsp;
							Game-Winning Goals
							<br />
							<input type="checkbox" name="shots_on_goal" />
							&nbsp;
							Shots On Goal
							<br />
							<input type="checkbox" name="shot_percentage" />
							&nbsp;
							Shot Percentage
							<br />
							<input type="checkbox" name="faceoffs_won" />
							&nbsp;
							Faceoffs Won
							<br />
							<input type="checkbox" name="faceoffs_lost" />
							&nbsp;
							Faceoffs Lost
						</div>
						<div classname="goalie-stats">
							Goalie Stats
							<br />
							<input type="checkbox" name="games_started" />
							&nbsp;
							Games Started
							<br />
							<input type="checkbox" name="wins" />
							&nbsp;
							Wins
							<br />
							<input type="checkbox" name="losses" />
							&nbsp;
							Losses
							<br />
							<input type="checkbox" name="goals_against" />
							&nbsp;
							Goals Against
							<br />
							<input type="checkbox" name="goals_against_average" />
							&nbsp;
							Goals Against Average
							<br />
							<input type="checkbox" name="shots_against" />
							&nbsp;
							Shots Against
							<br />
							<input type="checkbox" name="saves" />
							&nbsp;
							Saves
							<br />
							<input type="checkbox" name="save_percentage" />
							&nbsp;
							Save Percentage
							<br />
							<input type="checkbox" name="shutouts" />
							&nbsp;
							Shutouts
							<br />
							<input type="checkbox" name="minutes_played" />
							&nbsp;
							Minutes Played
							<br />
							<input type="checkbox" name="hits" />
							&nbsp;
							Hits
							<br />
							<input type="checkbox" name="blocks" />
							&nbsp;
							Blocks
						</div>
					</div>
					<div>
						<button>Save Settings</button>
					</div>
				</SSF>
			</div>
		)
	}
}

			// <div className="account-settings">
			// 	<SSF onData={this.dataHandler}>
			// 		<input name="email" type="email" defaultValue=""/>
			// 		<input name="username" type="text" defaultValue=""/>
			// 		<input name="password" type="password" defaultValue=""/>
			// 	</SSF>
			// 	<button onClick={this.clickHandler}>
			// 		Delete Account
			// 	</button>
			// </div>