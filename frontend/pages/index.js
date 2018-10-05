import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import { Config } from "../config.js";

class Index extends Component {
	static async getInitialProps(context) {
		const reviewsRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/posts?_embed`
		);
		const reviews = await reviewsRes.json();
		return { reviews };
	}

	render() {
		const reviews = this.props.reviews.map((post, index) => {
			return (
				<ul key={index}>
					<li>
						<Link
							as={`/review/${post.slug}`}
							href={`/review?slug=${post.slug}&apiRoute=review`}
						>
							<a>{post.title.rendered}</a>
						</Link>
					</li>
				</ul>
			);
		});
		return (
			<Layout>
				<Menu menu={this.props.headerMenu} />
				{reviews}
			</Layout>
		);
	}
}

export default PageWrapper(Index);
