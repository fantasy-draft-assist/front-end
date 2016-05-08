// This component allows users to select how many fantasy teams are in their league, as well as
// which scoring categories are active. The data will be saved in the back end and used as a reference point
// for rendering statistics based on a back-end algorithm.

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