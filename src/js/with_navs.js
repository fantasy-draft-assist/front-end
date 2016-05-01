import React, { Component, PropTypes} from 'react';

import TopNav from './top_nav';
import BottomNav from './bottom_nav';

export default class WithNavs extends Component {

	render() {
		return (
			<div className="with-navs">
				<TopNav />
				{this.props.children}
				<BottomNav />
			</div>
		)
	}
}