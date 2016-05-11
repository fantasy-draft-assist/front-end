import React, { Component } from 'react';
import SSF from 'react-simple-serial-form';
import { hashHistory } from 'react-router';

export default class SearchBar extends Component {


	firstNameHandler(searchString) {
		console.log('At dataHandler, the searchString is =>', searchString);
		hashHistory.push(`/search_results/${searchString.firstOrLast}/${searchString.firstName}/${searchString.thirdParam}`);
	}

	lastNameHandler(searchString) {
		console.log('At dataHandler, the searchString is =>', searchString);
		hashHistory.push(`/search_results/${searchString.firstOrLast}/${searchString.lastName}/${searchString.thirdParam}`);
	}

	dataHandler() {

	}

	render() {
		return (
			<div className="search-bar">
				<div className="form-container">
					<SSF onData={this.firstNameHandler}>
						<input className="hide-this" name="firstOrLast" defaultValue="first_name"></input>
						<input name="firstName" type="text" placeholder=" Search Player By First Name"></input>
						<input className="hide-this" name="thirdParam" defaultValue="testing"></input>
						<button>Go</button>
					</SSF>
					<SSF onData={this.lastNameHandler}>
						<input className="hide-this" name="firstOrLast" defaultValue="last_name"></input>
						<input name="lastName" type="text" placeholder=" ...Or By Last Name"></input>
						<input className="hide-this" name="thirdParam" defaultValue="testing"></input>
						<button>Go</button>
					</SSF>
				</div>
			</div>
		)
	}
}