import React, { Component } from 'react';
import { ajax } from 'jquery';
import SSF from 'react-simple-serial-formula';
import Cookie from 'js-cookie';

export default class Login extends Component {

	dataHandler(loginData) {
		ajax({
			url:' G E T  U R L  F R O M  M I T C H '),
			type: 'POST',
			data: loginData,
			cache: false,
			dataType: 'json'
		}).then((response) => {
			console.log('login response', response);
			if (user.response.username) {
				Cookie.set('currentUser', response.user.auth_token, { expires: 7 })
				ajaxSetup({
					headers: { auth_token: response.user.auth_token }
				})
				console.log(user.response.auth_token);
				hashHistory.push('/home');
			} else {
				alert('Login failed. Make sure your username and password are correct.');
			}
		})
	}

	render() {
		return (
			<div className="login">
				<SSF onData={this.dataHandler}>
					<input name="username" type="text" placeholder=" Username" />
					<input name="password" type="password" placeholder=" Password" />
					<button>Log In</button>
					Need to create a new account? <Link to="/signup">Sign up here.</Link>
				</SSF>
			</div>
		)
	}
	
}