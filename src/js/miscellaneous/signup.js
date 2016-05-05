// This component renders when a user visits the site and clicks on a link from the Login component.

import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import Cookie from 'js-cookie';
import { ajax, ajaxSetup } from 'jquery';

import nhlTeams from '../nhl_teams';

export default class Signup extends Component {

	// optionTeamFiller fills  in the select box with options of each NHL team for users to select.
	optionTeamFiller(nhlTeam) {
		return (
			<option value={nhlTeam}>{nhlTeam}</option>
		)
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
			ajaxSetup({
				headers: { 'Internal_Auth': response.user.auth_token }
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
					<li>
						<SSF onData={this.dataHandler}>
							<input className="signup-field" name="email" type="email" placeholder="Enter Your Email" />
							<input className="signup-field" name="username" type="text" placeholder="Create a Username" />
							<input className="signup-field" name="password" type="password" placeholder="Create a Password" />
							<select className="signup-field" name="favorite_team">
								<option>Favorite NHL Team</option>
								{nhlTeams.map(this.optionTeamFiller)}
							</select>
							<button>Create Account</button>
						</SSF>
					</li>
				
					<li>
						Already have an account? <Link to="/">  Log in.</Link>
					</li>
				</ul>
			</div>
		)
	}
}