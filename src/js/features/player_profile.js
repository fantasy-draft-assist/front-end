import React, { Component } from 'react';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

export default class PlayerProfile extends Component {

	constructor(...args) {
		super(...args);

		this.state = { zamboni: {} }
	}

	componentWillMount() {
		let { yahooID } = this.props.params;
		ajax({
			headers: { Internal: Cookie.get('currentUser') },
			url: `https://hockeydoctor.herokuapp.com/players/one/${yahooID}`,
			type: 'GET',
			cache: false,
		}).then(response => {
			console.log('Response is', response);
			this.setState( {zamboni: response} );
			console.log('State is', this.state.zamboni);
		})
	}

	render() {
		let { zamboni } = this.state;
		if (!zamboni.player) {
			return (
				<div>Loading...</div>
			)
		}
		return (
			<div className="player-profile">
				{zamboni.player.first_name}
				{zamboni.player.last_name}
			</div>
		)
	}
}