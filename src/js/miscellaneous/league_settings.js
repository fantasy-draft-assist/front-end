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
			<div className="account-settings">
				<p>Account Settings</p>
				<SSF onData={this.dataHandler}>
					<select>
						<option>Number of Teams in Your League</option>
						{this.fillLeagueTeams()}
					</select>
					<select>
						<option>Skaters Per Fantasy Team</option>
						{this.fillTeamSkaters()}
					</select>
					<select>
						<option>Goalies Per Fantasy Team</option>
						{this.fillTeamGoalies()}
					</select>
					<br />
					<br />
					Skater Stats
					<br />
					<input type="checkbox" name="goals" />Goals
					<br />
					<input type="checkbox" name="assists" />Assists
					<br />
					<input type="checkbox" name="points" />Points
					<br />
					<input type="checkbox" name="plus_minus" />Plus / Minus
					<br />
					<input type="checkbox" name="penalty_minutes" />Penalty Minutes
					<br />
					<input type="checkbox" name="powerplay_goals" />Powerlay Goals
					<br />
					<input type="checkbox" name="powerplay_assists" />Powerplay Assists
					<br />
					<input type="checkbox" name="powerplay_points" />Powerplay Points
					<br />
					<input type="checkbox" name="shorthanded_goals" />Shorthanded Goals
					<br />
					<input type="checkbox" name="shorthanded_assists" />Shorthanded Assists
					<br />
					<input type="checkbox" name="shorthanded_points" />Shorthanded Points
					<br />
					<input type="checkbox" name="game_winning_goals" />Game-Winning Goals
					<br />
					<input type="checkbox" name="shots_on_goal" />Shots On Goal
					<br />
					<input type="checkbox" name="shot_percentage" />Shot Percentage
					<br />
					<input type="checkbox" name="faceoffs_won" />Faceoffs Won
					<br />
					<input type="checkbox" name="faceoffs_lost" />Faceoffs Lost
					<br />
					<br />
					Goalie Stats
					<br />
					<input type="checkbox" name="games_started" />Games Started
					<br />
					<input type="checkbox" name="wins" />Wins
					<br />
					<input type="checkbox" name="losses" />Losses
					<br />
					<input type="checkbox" name="goals_against" />Goals Against
					<br />
					<input type="checkbox" name="goals_against_average" />Goals Against Average
					<br />
					<input type="checkbox" name="shots_against" />Shots Against
					<br />
					<input type="checkbox" name="saves" />Saves
					<br />
					<input type="checkbox" name="save_percentage" />Save Percentage
					<br />
					<input type="checkbox" name="shutouts" />Shutouts
					<br />
					<input type="checkbox" name="minutes_played" />Minutes Played
					<br />
					<input type="checkbox" name="hits" />Hits
					<br />
					<input type="checkbox" name="blocks" />Blocks
					<br />
					<button>Save Settings</button>
					<br />
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