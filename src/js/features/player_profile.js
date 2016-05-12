import React, { Component } from 'react';
import { ajax } from 'jquery';

export default class PlayerProfile extends Component {

	constructor(...args) {
		super(...args);

		this.state = { zamboni: [] }
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="player-profile">
			</div>
		)
	}
}