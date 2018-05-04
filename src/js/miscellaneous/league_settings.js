// This component is used for CRUD.
// Specifically, users can update or delete an account when this component is rendered.
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

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
		console.log('league-settings', accountSettingsData);

		var allSettings = {
			goals: false,
			assists: false,
			points: false,
			plus_minus: false,
			penalty_minutes: false,
			powerplay_goals: false,
			powerplay_assists: false,
			powerplay_points: false,
			shorthanded_goals: false,
			shorthanded_assists: false,
			shorthanded_points: false,
			game_winning_goals: false,
			shots_on_goal: false,
			shot_percentage: false,
			faceoffs_won: false,
			faceoffs_lost: false,
			games_started: false,
			wins: false,
			losses: false,
			goals_against: false,
			goals_against_average: false,
			shots_against: false,
			saves: false,
			save_percentage: false,
			shutouts: false,
			minutes_played: false,
			hits: false,
			blocks: false
		}

		Object.keys(allSettings).forEach(setting => {
			if (accountSettingsData[setting]) {
				allSettings[setting] = true;
			} 
		});

		// console.log('allSettings', allSettings);
		// console.log('user', Cookie.get('currentUser'));

		ajax({
			url: 'https://hockeydoctor.herokuapp.com/settings',
			headers: { Internal: Cookie.get('currentUser') },
			type: 'PUT',
			data: allSettings,
			dataType: 'json',
			cache: false
		}).then(response => {
			// do something here
			hashHistory.push('/home');
		})
	}

	render() {
		return (
			<div className="league-settings">
				<div className="league-top-text">
					Select the scoring categories tracked by your fantasy league for more accurate player rankings and statistical information.
				</div>
				<div className="league-form-wrapper">
					<SSF onData={this.dataHandler}>
						<div className="stats">
							<div className="skater-stats">
								<span className="stats-header">
									Skater Stats
								</span>
								<br />
								<br />
								<input type="checkbox" defaultChecked="true" name="goals" />
								&nbsp;
								Goals
								<br />
								<input type="checkbox" defaultChecked="true" name="assists" />
								&nbsp;
								Assists
								<br />
								<input type="checkbox" defaultChecked="true" name="points" />
								&nbsp;
								Points
								<br />
								<input type="checkbox" defaultChecked="true" name="plus_minus" />
								&nbsp;
								Plus / Minus
								<br />
								<input type="checkbox" defaultChecked="true" name="penalty_minutes" />
								&nbsp;
								Penalty Minutes
								<br />
								<input type="checkbox" defaultChecked="true" name="powerplay_goals" />
								&nbsp;
								Powerlay Goals
								<br />
								<input type="checkbox" defaultChecked="true" name="powerplay_assists" />
								&nbsp;
								Powerplay Assists
								<br />
								<input type="checkbox" defaultChecked="true" name="powerplay_points" />
								&nbsp;
								Powerplay Points
								<br />
								<input type="checkbox" defaultChecked="true" name="shorthanded_goals" />
								&nbsp;
								Shorthanded Goals
								<br />
								<input type="checkbox" defaultChecked="true" name="shorthanded_assists" />
								&nbsp;
								Shorthanded Assists
								<br />
								<input type="checkbox" defaultChecked="true" name="shorthanded_points" />
								&nbsp;
								Shorthanded Points
								<br />
								<input type="checkbox" defaultChecked="true" name="game_winning_goals" />
								&nbsp;
								Game-Winning Goals
								<br />
								<input type="checkbox" defaultChecked="true" name="shots_on_goal" />
								&nbsp;
								Shots On Goal
								<br />
								<input type="checkbox" defaultChecked="true" name="shot_percentage" />
								&nbsp;
								Shot Percentage
								<br />
								<input type="checkbox" defaultChecked="true" name="faceoffs_won" />
								&nbsp;
								Faceoffs Won
								<br />
								<input type="checkbox" defaultChecked="true" name="faceoffs_lost" />
								&nbsp;
								Faceoffs Lost
								<br />
								<input type="checkbox" defaultChecked="true" name="hits" />
								&nbsp;
								Hits
								<br />
								<input type="checkbox" defaultChecked="true" name="blocks" />
								&nbsp;
								Blocks
							</div>
							<div className="goalie-stats">
								<span className="stats-header">
									Goalie Stats
								</span>
								<br />
								<br />
								<input type="checkbox" defaultChecked="true" name="games_started" />
								&nbsp;
								Games Started
								<br />
								<input type="checkbox" defaultChecked="true" name="wins" />
								&nbsp;
								Wins
								<br />
								<input type="checkbox" defaultChecked="true" name="losses" />
								&nbsp;
								Losses
								<br />
								<input type="checkbox" defaultChecked="true" name="goals_against" />
								&nbsp;
								Goals Against
								<br />
								<input type="checkbox" defaultChecked="true" name="goals_against_average" />
								&nbsp;
								Goals Against Average
								<br />
								<input type="checkbox" defaultChecked="true" name="shots_against" />
								&nbsp;
								Shots Against
								<br />
								<input type="checkbox" defaultChecked="true" name="saves" />
								&nbsp;
								Saves
								<br />
								<input type="checkbox" defaultChecked="true" name="save_percentage" />
								&nbsp;
								Save Percentage
								<br />
								<input type="checkbox" defaultChecked="true" name="shutouts" />
								&nbsp;
								Shutouts
								<br />
								<input type="checkbox" defaultChecked="true" name="minutes_played" />
								&nbsp;
								Minutes Played
								<br />
							</div>
						</div>
						<div>
							<button>Save Settings</button>
						</div>
					</SSF>
				</div>
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