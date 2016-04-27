import React, { Component } from 'react';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';

export default class AccountSettings extends Component {

	dataHandler();
	// Make this do something.

	clickHandler();
	// Make this do something.

	render() {
		return (
			<div className="account-settings">
				<SSF onData={this.dataHandler}>
					<input name="email" type="email" defaultValue=""/>
					<input name="username" type="text" defaultValue=""/>
					<input name="password" type="password" defaultValue=""/>

				</SSF>
				<button onClick={this.clickHandler}>
					Delete Account
				</button>
			</div>
		)
	}
}