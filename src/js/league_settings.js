import React, { Component } from 'react';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';

export default class LeagueSettings extends Component {


	render() {
		return (
			<div className="league-settings">
				<p>Form Goes Here</p>
			</div>
		)
	}
}

// The form will contain number of teams in fantasy league and scoring categories with an on/off switch.