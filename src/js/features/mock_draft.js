// This component is the bread and butter of the app, as well as its most complex piece.
// In this component, users can complete a mock draft to prepare for a real fantasy hockey draft.

import React, { Component } from 'react';
import { ajax } from 'jquery';

export default class MockDraft extends Component {

	constructor(...args) {
		super(...args);

		this.state = { hockeyPlayers: [] };
	}

	componentWillMount() {
		ajax('G E T   U R L   F R O M   M I T C H').then((draftData) => {
			this.setState( {hockeyPlayers: draftData} )
		});
	}

	// getDraftList(hockeyPlayer) {
	// 	return (
	// 		hockeyPlayer.name
	// 		hockeyPlayer.team
	// 		hockeyPlayer.position
	// 		hockeyPlayer.goals
	// 		hockeyPlayer.assists
	// 	)
	// }

	render() {
		return (
			<div className="mock-draft">
				<div>
					Coming Soon
				</div>
			</div>
		)
	}
}