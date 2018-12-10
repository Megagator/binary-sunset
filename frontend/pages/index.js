import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import PubDate from "../components/PubDate";

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
		const Fragment = React.Fragment;
		const reviews = this.props.reviews.map((post, index) => {
			console.log(post)
			return (
				<div key={index}>
					<Link
						as={`/review/${post.slug}`}
						href={`/review?slug=${post.slug}&apiRoute=review`}
						>
						<a>{post.title.rendered}</a>
					</Link>
					<p
						dangerouslySetInnerHTML={{
							__html: post.excerpt.rendered
						}}
					/>
					<PubDate published={post.date} modified={post.modified} />
				</div>
			);
		});

		return (
			<section className="container main-block post-loop">
				{reviews}
			</section>
		);
	}
}

export default PageWrapper(Index);
