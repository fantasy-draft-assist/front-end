import React, { Component } from 'react';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';

export default class SearchBar extends Component {

	dataHandler(searchString) {
		console.log('At dataHandler, the searchString is =>', searchString);
		hashHistory.push(`/search_results/${searchString.name}`);
	}

	render() {
		return (
			<div className="search-bar">
				<div className="form-container">
					<SSF onData={this.dataHandler}>
						<input name="name" type="text" placeholder="Player Search"></input>
						<button>Go</button>
					</SSF>
				</div>
			</div>
		)
	}
}