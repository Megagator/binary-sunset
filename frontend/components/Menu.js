import React, { Component } from "react";
import Link from "next/link";

const Fragment = React.Fragment;

class Menu extends Component {
	constructor() {
		super();
	}

	getSlug(url) {
		const parts = url.split("/");
		return parts.length > 2 ? parts[parts.length - 2] : "";
	}

	render() {
		return (
			<header className="site-header">
				<nav className="container">
					<Link href="/">
						<a>Home</a>
					</Link>
				</nav>
			</header>
		)
	}

}

export default Menu;
