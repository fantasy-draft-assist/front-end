// This component is rendered when a user loads the root URL of the app without a valid cookie.

import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import Cookie from 'js-cookie';

export default class Login extends Component {

	//dataHandler is called when a user attempts to log in, making an Ajax post call to the back end.
	dataHandler(loginData) {
		console.log('Handler works.', loginData);
		ajax({
			url:'https://hockeydoctor.herokuapp.com/login',
			type: 'POST',
			data: loginData,
			cache: false,
			dataType: 'json'
		}).then((response) => {

			//If the login is successful, the user is logged in and routed to the Home component.
			console.log('login response', response);
			Cookie.set('currentUser', response.user.auth_token, { expires: 7 })
			ajaxSetup({
				headers: { Intenral_Auth: response.user.auth_token }
			})
			console.log(response.user.auth_token);
			hashHistory.push('/home');
		}).fail(error => {

			// If login fails, a user is alerted that the login failed.
			alert('Login failed. Make sure your username and password are correct.');
		})
	}

	render() {
		return (
			<div className="login">
				<SSF onData={this.dataHandler}>
					<input name="username" type="text" placeholder=" Username" />
					<input name="password" type="password" placeholder=" Password" />
					<button>Log In</button>
				</SSF>
				Need to create a new account? <Link to="/signup">Sign up here.</Link>
			</div>
		)
	}
	
}