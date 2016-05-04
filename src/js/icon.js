// This component allows icons to be used more easily in JSX.
// Instead of an <i> tag, this component allows icons to be written as <Icon /> with a specifiic className
// as the value of the type property.

import React, { PropTypes, Component } from 'react'; 

export default class Icon extends Component {

	static propTyps = {
		type: PropTypes.string.isRequired
	}

	render () {
		let { type } = this.props;
		return (
			<i className={`fa fa-${type}`} />
		);
	}
}