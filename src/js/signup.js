import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import Cookie from 'js-cookie';
import { ajax, ajaxSetup } from 'jquery';

export default class Signup extends Component {

	dataHandler(signupData) {
		console.log('Handler works.', signupData);

		ajax({
			url: 'https://hockeydoctor.herokuapp.com/registration',
			type: 'POST',
			data: signupData,
			cache: false,
			dataType: 'json'
		}).then((response) => {
			console.log('signup response is', response);
			Cookie.set('currentUser', response.user.auth_token, { expires: 7 });
			ajaxSetup({
				headers: { 'Internal_Auth': response.user.auth_token }
			})
			console.log(response.user.auth_token);
			hashHistory.push('/home');
		}).fail(error => {
			alert('Signup was unsuccessful. Please try again.');
		});
	};

	render() {
		return (
			<div className="signup">
				<SSF onData={this.dataHandler}>
					<input name="email" type="email" placeholder="Enter Your Email" />
					<input name="username" type="text" placeholder="Create a Username" />
					<input name="password" type="password" placeholder="Create a Password" />
					<select name="favorite_team">
						<option>Favorite NHL Team</option>
						<option value="Anaheim Ducks">Anaheim Ducks</option>
						<option value="Boston Bruins">Boston Bruins</option>
						<option value="Buffalo Sabres">Buffalo Sabres</option>
						<option value="Calgary Flames">Calgary Flames</option>
						<option value="Carolina Hurricanes">Carolina Hurricanes</option>
						<option value="Chicago Blackhawks">Chicago Blackhawks</option>
						<option value="Colorado Avalanche">Colorado Avalanche</option>
						<option value="Columbus Blue Jackets">Columbus Blue Jackets</option>
						<option value="Dallas Stars">Dallas Stars</option>
						<option value="Detroit Red Wings">Detroit Red Wings</option>
						<option value="Edmonton Oilers">Edmonton Oilers</option>
						<option value="Florida Panthers">Florida Panthers</option>
						<option value="Los Angeles Kings">Los Angeles Kings</option>
						<option value="Minnesota Wild">Minnesota Wild</option>
						<option value="Montreal Canadiens">Montreal Canadiens</option>
						<option value="Nashville Predators">Nashville Predators</option>
						<option value="New Jersey Devils">New Jersey Devils</option>
						<option value="New York Islanders">New York Islanders</option>
						<option value="New York Rangers">New York Rangers</option>
						<option value="Ottawa Senators">Ottawa Senators</option>
						<option value="Philadelphia Flyers">Philadelphia Flyers</option>
						<option value="Phoenix Coyotes">Phoenix Coyotes</option>
						<option value="Pittsburgh Penguins">Pittsburgh Penguins</option>
						<option value="St. Louis Blues">St. Louis Blues</option>
						<option value="San Jose Sharks">San Jose Sharks</option>
						<option value="Tampa Bay Lightning">Tampa Bay Lightning</option>
						<option value="Torontoa Maple Leafs">Torontoa Maple Leafs</option>
						<option value="Vancouver Canucks">Vancouver Canucks</option>
						<option value="Washington Capitals">Washington Capitals</option>
						<option value="Winnipeg Jets">Winnipeg Jets</option>
					</select>
					<button>Create Account</button>
				</SSF>
				Already have an account? <Link to="/">Log in.</Link>
			</div>
		)
	}
}


		// let data = new FormData();

		// data.append("email", signupData.email);
		// data.append("username", signupData.username);
		// data.append("password", signupData.password);
		// data.append("favorite_team", signupData.favorite_team);
