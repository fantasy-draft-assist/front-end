import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LeftNav extends Component {

	render() {
		return (
			<div className="left-nav">
				<ul>
					<Link to="/mock_draft">
						<li>Mock Draft</li>
					</Link>
					<Link to="/rankings">
						<li>Player Ranks</li>
					</Link>
					<Link to="/timeline">
						<li>Historical Data</li>
					</Link>
					<Link to="/side_by_side">
						<li>Side-By-Side Comparison</li>
					</Link>
				</ul>
			</div>
		)
	}
}