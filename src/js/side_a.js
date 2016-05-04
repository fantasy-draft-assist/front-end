// This component will be used as the left-side comparator in the SideBySide component. 

import React, { Component } from 'react';

export default class SideA extends Component {

	// optionTeamFiller fills  in the select box with options of each NHL team for users to select.
	optionTeamFiller(nhlTeam) {
		return (
			<option value={nhlTeam}>`${nhlTeam}`</option>
		)
	}

	render() {
		return (
			<SSF onData={this.dataHandler}>
					<option>Find Player By Team</option>
					{nhlTeams.map(this.optionTeamFiller)}
				</select>
			</SSF>
		)
	}
}