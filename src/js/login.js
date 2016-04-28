import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { ajax, ajaxSetup } from 'jquery';
import SSF from 'react-simple-serial-form';
import Cookie from 'js-cookie';

export default class Login extends Component {

	dataHandler(loginData) {
		console.log('Handler works.', loginData);

		ajax({
			url:'https://hockeydoctor.herokuapp.com/login',
			type: 'POST',
			data: loginData,
			cache: false,
			dataType: 'json'
		}).then((response) => {
			console.log('login response', response);
			Cookie.set('currentUser', response.user.auth_token, { expires: 7 })
			ajaxSetup({
				headers: { Intenral_Auth: response.user.auth_token }
			})
			console.log(response.user.auth_token);
			hashHistory.push('/home');
		}).fail(error => {
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