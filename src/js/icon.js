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