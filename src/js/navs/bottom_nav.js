// The bottom nav exists purely for social media links and other internal links commonly found on websites.

import React, { Component } from 'react';
import { Link } from 'react-router';

import Icon from '../miscellaneous/icon';

export default class BottomNav extends Component {

	render() {
		return (
			<div className="bottom-nav">
				<ul className="bottom-icons-ul">
					<li className="bottom-icons-li">
						<Icon type="facebook" />
					</li>
					<li className="bottom-icons-li">
						<Icon type="twitter" />
					</li>
					<li className="bottom-icons-li">
						<Icon type="instagram" />
					</li>
					<li className="bottom-icons-li">
						<Icon type="youtube" />
					</li>
				</ul>
			</div>
		)
	}
}