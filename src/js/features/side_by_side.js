// This component is used to compare two NHL players (and their respective statistics) in a side-by-side format.

import React, { Component } from 'react';
import { ajax } from 'jquery';

import SideA from './side_a';
import SideB from './side_b';

export default class SideBySide extends Component {

	// constructror(...args) {
	// 	super(...args);

	// 	this.state = { playersBeingCompared: [] }
	// }

	// componentWillMount() {
	// 	ajax('URL FROM MITCH').then(player1 => {

	// 		let { playersBeingCompared } = this.state;
	// 		playersBeingCompared.push(player1);

	// 		this.setState( { playersBeingCompared } );
	// 	}).then(
	// 		ajax(URL 2).then(player2 => {
	// 			let { playersBeingCompared } = this.state;
	// 			playersBeingCompared.push(player2);
	// 			this.setState( { playersBeingCompared} );
	// 		})
	// 	)
	// // }


	// callBack() {
	// 	return (
	// 		<li>

	// 		</li>
	// 	)
	// }
	
	render() {
		return(
			<div className="side-by-side">

				<p>Side By Side Player Comparison</p>

				<SideA />
				<SideB />

				<ul>
					{this.callBack}
				</ul>
			
			</div>
		)
	}
}