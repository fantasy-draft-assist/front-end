// This component is used as a subroute in the React Router to display all children with the TopNav and BottomNav components.
import React, { Component, PropTypes} from 'react';
import TopNav from '../navs/top_nav';
import SearchBar from '../navs/search_bar';
import BottomNav from '../navs/bottom_nav';

export default class WithNavs extends Component {
	render() {
		return (
			<div className="with-navs">
				<TopNav />
				<SearchBar />
				{this.props.children}
				<BottomNav />
			</div>
		)
	}
}