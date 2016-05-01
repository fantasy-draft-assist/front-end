import React, { Component } from 'react';
import { Link } from 'react-router';

import Icon from './icon';

export default class BottomNav extends Component {

	render() {
		return (
			<div className="left-nav">
				<ul className="bottom-icons">
					<li>
						<Icon type="facebook" />
					</li>
					<li>
						<Icon type="twitter" />
					</li>
					<li>
						<Icon type="instagram" />
					</li>
				</ul>
			</div>
		)
	}
}