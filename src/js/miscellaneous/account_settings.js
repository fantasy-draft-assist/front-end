// This component allows users to select how many fantasy teams are in their league, as well as
// which scoring categories are active. The data will be saved in the back end and used as a reference point
// for rendering statistics based on a back-end algorithm.

import React, { Component } from 'react';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

export default class LeagueSettings extends Component {

	dataHandler() {
		let dataToDelete = {
			username: Cookie.get('currentUserName')
		}
		let confirmMessage = confirm('Are you sure you want to delete your account with Hockey Doctor?');
		if (confirmMessage === true) {
			ajax({
				url: 'https://hockeydoctor.herokuapp.com/registration',
				type: 'DELETE',
				data: dataToDelete,
				dataType: 'json',
				headers: { Internal: Cookie.get('currentUser') },
				cache: false
			}).then(response => {
				hashHistory.push('/signup');
			})
		}
	}

	render() {
		return (
			<div className="account-settings">
				<SSF onData={this.dataHandler}>
					<button>Delete Account</button>
				</SSF>
			</div>
		)
	}
}

// The form will contain number of teams in fantasy league and scoring categories with an on/off switch.