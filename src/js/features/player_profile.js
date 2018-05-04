import React, { Component } from 'react';
import { ajax } from 'jquery';
import Cookie from 'js-cookie';

export default class PlayerProfile extends Component {

	constructor(...args) {
		super(...args);

		this.state = { zamboni: {}, settings: {} }
	}

	componentWillMount() {
		let { yahooID } = this.props.params;
		ajax({
			url: 'https://hockeydoctor.herokuapp.com/settings',
			headers: { Internal: Cookie.get('currentUser') }
			}).then((settings) => {
			this.setState( {settings} );
			console.log('Settings after Ajax', this.state.settings);
		});
		ajax({
			headers: { Internal: Cookie.get('currentUser') },
			url: `https://hockeydoctor.herokuapp.com/players/one/${yahooID}`,
			type: 'GET',
			cache: false,
		}).then(response => {
			console.log('Response is', response);
			this.setState( {zamboni: response} );
			console.log('State is', this.state.zamboni);
		});
	}

	getSettings() {
		// just grab first player to check for null values
		let zamboni = this.state.zamboni;

		// array of setting names we want.
		let settings = Object.keys(this.state.settings)
			.filter(setting => this.state.settings[setting])
			.filter(setting => zamboni || zamboni.stats[setting]);

		console.log('settings', settings);

		return settings;
	}

	getData() {
		let zamboni = this.state.zamboni;
		let seasons = this.state.zamboni.pro_player;
		console.log('Seasons are', seasons)
		let data = this.state.zamboni.stats;
		let settings = this.getSettings();
		console.log('Settings in getData', settings);
		// if (this.state.filter) {
		// 	data = data.filter(hockeyPlayer => hockeyPlayer.player.positions[0] === this.state.filter || hockeyPlayer.player.positions[1] === this.state.filter || hockeyPlayer.player.positions[2] === this.state.filter);
		// }
		return data.map(statYear => (
			<tr key={statYear.created_at} className="interpolated-table-rows">

				{/*{seasons.map(season => (
					<td key={season.season}>{season.season}</td>
					)
					)}*/}

				{settings.map(setting => (
					<td key={setting} className="50-pixels-wide">{statYear[setting]}</td>
				))}
			</tr>
			)
		)
	}

	render() {
		let { zamboni } = this.state;
		let settings = this.getSettings();
		if (!zamboni.player || settings.length === 0) {
			return (
				<div>Loading...</div>
			)
		} else return (
			<div className="player-profile">
				<div className="above-the-table">
					<img src={zamboni.player.headshot_url} alt={`${zamboni.player.first_name} ${zamboni.player.last_name}`} title={`${zamboni.player.first_name} ${zamboni.player.last_name}`} width="75" height="100" />
					{`${zamboni.player.first_name} ${zamboni.player.last_name} is a ${zamboni.player.positions[0]} who wears #${zamboni.player.uniform_number} for the ${zamboni.pro_team.name}.`}
				</div>
				<table width="600">
					<thead>
						<tr>
							{settings.map(setting => {
								name = setting.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
								return <th key={setting} className="50-pixels-wide" alt={name} title={name}>{name}</th>
							})}
						</tr>
					</thead>
					<tbody>
						{this.getData()}
					</tbody>
				</table>
			</div>
		)
	}
}