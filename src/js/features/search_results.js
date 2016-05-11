import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { ajax } from'jquery';

export default class SearchResults extends Component {

	constructor(...args) {
		super(...args);

		this.state = { playersToReturn: [] };
	}

	componentWillMount() {
		let { param1, param2, param3 } = this.props.params;
		ajax({
			headers: {Internal: Cookie.get('currentUser')},
			url: `https://hockeydoctor.herokuapp.com/players/search?${param1}=${param2}`,
			type: 'GET',
			dataType: 'json',
			cache: false,
		}).then(playersFound => {
			console.log('The players found include =>', playersFound);
			this.setState( {playersToReturn: playersFound} )
		})
	}

	wordsOnPage() {
		let data = this.state.playersToReturn;
		console.log("The data is =>", data);
		return (
			data.map(datum => {
				{datum.last_name}
			})
		)
	}

	render() {
		return (
			<div className="search-results">
				Search Results Page
				{::this.wordsOnPage()}
			</div>
		)
	}
}