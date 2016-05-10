// This component renders when a user visits the site and clicks on a link from the Login component.

import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import Cookie from 'js-cookie';
import { ajax, ajaxSetup } from 'jquery';

import nhlTeams from '../miscellaneous/nhl_teams';

export default class Signup extends Component {

	// optionTeamFiller fills  in the select box with options of each NHL team for users to select.
	optionTeamFiller(nhlTeam) {
		return (
			<option value={nhlTeam}>{nhlTeam}</option>
		)
	}

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


	// dataHandler grabs new user info and stores it in the back end.
	dataHandler(signupData) {
		console.log('Handler works.', signupData);
		ajax({
			url: 'https://hockeydoctor.herokuapp.com/registration',
			type: 'POST',
			data: signupData,
			cache: false,
			dataType: 'json'
		}).then((response) => {

			// If signup is successful, the response from the back end is logged in the console and a cookie is set
			// to keep a user loged in for a week. The user is routed to the Home component.
			console.log('signup response is', response);
			Cookie.set('currentUser', response.user.auth_token, { expires: 7 });
			Cookie.set('currentUserName', response.user.username, { expires: 7 });
			ajaxSetup({
				headers: { 'Internal': response.user.auth_token }
			})
			console.log(response.user.auth_token);
			hashHistory.push('/home');
		}).fail(error => {

			// If registration fails, the user is alerted so.
			alert('Signup was unsuccessful. Please try again.');
		});
	};


	render() {
		return (
			<div className="signup">
				<ul>
					<li className="signup-logo">
						Hockey Doctor
					</li>
					<li>
						<SSF onData={this.dataHandler}>
							<ul className="signup-blocks">
								<li className="signup-left">
									<input className="signup-field" name="email" type="email" placeholder=" Enter Your Email" />
									<input className="signup-field" name="league_name" type="text" placeholder=" Fantasy League Team Name" />
									<select className="signup-field" name="team_count">
										<option>Teams in Your League</option>
											{this.fillLeagueTeams()}
									</select>
									<select className="signup-field" name="favorite_team">
										<option>Favorite NHL Team</option>
										{nhlTeams.map(this.optionTeamFiller)}
									</select>
								</li>
								<li className="signup-right">
									<input className="signup-field" name="username" type="text" placeholder=" Create a Username" />
									<input className="signup-field" name="password" type="password" placeholder=" Create a Password" />
									<select className="signup-field" name="player_count">
										<option>Skaters Per Fantasy Team</option>
											{this.fillTeamSkaters()}
									</select>
									<select className="signup-field" name="goalie_count">
										<option>Goalies Per Fantasy Team</option>
											{this.fillTeamGoalies()}
									</select>
								</li>
							</ul>
							<button>Create Account</button>
						</SSF>
					</li>
					<li className="below-signup-text">
						Already have an account?
					</li>
					<li className="below-signup-link">
						<Link to="/">Log In</Link>
					</li>
				</ul>
			</div>
		)
	}
}