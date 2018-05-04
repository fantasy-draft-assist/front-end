// This component exists purely for the sake of having a children property, allowing the React Router to be used.
import React, { Component } from 'react';

export default class Main extends Component {
	render() {
		return (
			<div className="main">
				{this.props.children}
			</div>
		)
	}
}