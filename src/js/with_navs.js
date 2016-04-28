import React, { Component, PropTypes} from 'react';

import TopNav from './top_nav';
import LeftNav from './left_nav';

export default class WithNavs extends Component {

	render() {
		return (
			<div className="with-navs">
				<TopNav />
				<LeftNav />
				{this.props.children}
			</div>
		)
	}
}