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


	render() {
		return (
			<div className="account-settings">
				<p>Account Settings</p>
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