import React, { Component, PropTypes} from 'react';

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