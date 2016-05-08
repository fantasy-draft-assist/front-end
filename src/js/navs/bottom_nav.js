// The bottom nav exists purely for social media links and other internal links commonly found on websites.

import React, { Component } from 'react';
import { Link } from 'react-router';

import Icon from '../miscellaneous/icon';

export default class BottomNav extends Component {

	render() {
		return (
			<div className="bottom-nav">
				<div className="bottom-top">
					<div>
						<ul className="bottom-words-ul">
							<Link to="/about">
								<li className="bottom-words-li bottom-left-left">
									About
								</li>
							</Link>
							<Link to="/account_settings">
								<li className="bottom-words-li bottom-left-right">
									Account
								</li>
							</Link>
						</ul>
					</div>
					<div>
						<ul className="bottom-icons-ul">
							<a href="http://www.facebook.com" target="_blank">
								<li className="bottom-icons-li">
									<Icon type="facebook" />
								</li>
							</a>
							<a href="http://www.twitter.com" target="_blank">
								<li className="bottom-icons-li">
									<Icon type="twitter" />
								</li>
							</a>
							<a href="http://www.instagram.com" target="_blank">
								<li className="bottom-icons-li">
									<Icon type="instagram" />
								</li>
							</a>
							<a href="http://www.youtube.com" target="_blank">
								<li className="bottom-icons-li">
									<Icon type="youtube" />
								</li>
							</a>
						</ul>
					</div>
					<div>
						<ul className="bottom-words-ul">
							<Link to="/privacy">
								<li className="bottom-words-li bottom-right-left">
									Privacy
								</li>
							</Link>
							<Link to="/legal">
								<li className="bottom-words-li bottom-right-right">
									Legal
								</li>
							</Link>
						</ul>
					</div>
				</div>
				<div className="bottom-bottom">
					&copy; 2016 Mitch & John, Inc.
				</div>
			</div>
		)
	}
}