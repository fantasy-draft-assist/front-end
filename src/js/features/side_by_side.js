// This component is used to compare two NHL players (and their respective statistics) in a side-by-side format.

import React, { Component } from 'react';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

import SideA from './side_a';
import SideB from './side_b';

export default class SideBySide extends Component {

	constructor(...args) {
		super(...args);

		this.state = { playersBeingCompared: [] }
	}


// http://hockeydoctor.herokuapp.com/players/one/35/


	componentWillMount() {
		let { idA, idB } = this.props.params;
		ajax({
			url: `https://hockeydoctor.herokuapp.com/players/one/${idA}`,
			headers: { Internal: Cookie.get('currentUser') }
			}).then(player1 => {

			let { playersBeingCompared } = this.state;
			playersBeingCompared.push(player1);

			this.setState( { playersBeingCompared } );
		}).then(
			ajax({
			url: `https://hockeydoctor.herokuapp.com/players/one/${idB}`,
			headers: { Internal: Cookie.get('currentUser') }
			}).then(player2 => {
				let { playersBeingCompared } = this.state;
				playersBeingCompared.push(player2);
				this.setState( { playersBeingCompared} );
				console.log('After Ajax the state is =>', playersBeingCompared)
			})
		)
	}


	getSBSPlayers() {
		let twoPlayers = this.state.playersBeingCompared;
		console.log('Got it in the SBSPlayers callbck =>', twoPlayers);
		return twoPlayers.map(datum => (
			<li key={datum.player.yahoo_player_id}>
				{datum.player.first_name}
				{datum.player.last_name}
				{datum.player.uniform_number}
				{datum.player.positions}
			</li>
			)
		)
	}
	
	render() {
		return(
			<div className="side-by-side">

				<p>Side By Side Player Comparison</p>

				<ul>
					{this.getSBSPlayers()}
				</ul>
			
			</div>
		)
	}
}

// <SideA />
// <SideB />