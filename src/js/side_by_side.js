// This component is used to compare two NHL players (and their respective statistics) in a side-by-side format.

import React, { Component } from 'react';
import { ajax } from 'jquery';

import SideA from './side_a';
import SideB from './side_b';

export default class SideBySide extends Component {
	
	render() {
		return(
			<div className="side-by-side">

				<p>Side By Side Player Comparison</p>

				<SideA />
				<SideB />
			
			</div>
		)
	}
}