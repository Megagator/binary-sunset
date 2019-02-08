import React, { Component } from "react";
import Link from "next/link";


class Menu extends Component {
	constructor() {
		super();
	}

	getSlug(url) {
		const parts = url.split("/");
		return parts.length > 2 ? parts[parts.length - 2] : "";
	}

	render() {
		let backToHome;
		if (this.props.backToHome === undefined)
			backToHome = true;
		else
			backToHome = this.props.backToHome

		return (
			<header className="site-header">
				<nav className="container">
					<div className="site-header-wrapper">
					{ backToHome &&

						<Link href="/">
							<svg className="back-arrow" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1280 800v192q0 13-9.5 22.5t-22.5 9.5h-352v192q0 14-9 23t-23 9q-12 0-24-10l-319-319q-9-9-9-23t9-23l320-320q9-9 23-9 13 0 22.5 9.5t9.5 22.5v192h352q13 0 22.5 9.5t9.5 22.5zm160 96q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
						</Link>
					}
					<Link href="/">
						<div className="logo">BINARY SUNSET</div>
					</Link>
					</div>
				</nav>
			</header>
		)
	}

}

export default Menu;
