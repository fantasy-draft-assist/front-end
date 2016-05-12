import React, { Component } from 'react';
import Cookie from 'js-cookie';
import { ajax } from'jquery';

export default class SearchResults extends Component {

	constructor(...args) {
		super(...args);

		this.state = { playersToReturn: [], thePlaya: {} };
	}

	componentWillMount() {
		let { name } = this.props.params;
		ajax({
			headers: {Internal: Cookie.get('currentUser')},
			url: `https://hockeydoctor.herokuapp.com/players/search?name=${name}`,
			type: 'GET',
			dataType: 'json',
			cache: false,
		}).then(playersFound => {
			console.log('The players found include =>', playersFound);
			this.setState( {playersToReturn: playersFound} );

			let data = this.state.playersToReturn;
		console.log("The data is =>", data);
		console.log('The first object in data is =>', data[0]);
		console.log('data[0].player shows =>', data[0].player);

		this.setState({thePlaya: data[0].player});



		})
	}

	wordsOnPage() {
		let data = this.state.playersToReturn;
		console.log("length",data.length);
		data.forEach((datum, index) => {
			console.log(datum.player.last_name);
			console.log("index", index)});
		// console.log("The data is =>", data);
		// console.log('The first object in data is =>', data[0]);
		// console.log('data[0].player shows =>', data[0].player);
		// console.log('data[0].pro_team shows =>', data[0].pro_team);
		return (
			data.map(datum => {
				<li>{datum.player.last_name}</li>
			})
		)
	}

	

	render() {

		let data = this.state.playersToReturn;

		let player = this.state.thePlaya;
		console.log("players in state", data[0]);
		console.log("player", player.last_name);
		return (
			<div className="search-results">
				Search Results Page
				<h2>{player.last_name}</h2>
				<ul>{data.map(datum => {
					<li key={datum.player.id}>{datum.player.last_name}</li>
			})}</ul>
				<ul>{::this.wordsOnPage()}</ul>
			</div>
		)
	}
}