import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper.js";
import PubDate from "../components/PubDate";
import MoviePoster from "../components/MoviePoster";

import { Config } from "../config.js";
import Menu from "../components/Menu.js";

const Fragment = React.Fragment;

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
			// console.log(this.props)
			return (
				<Link key={index} 
					as={`/review/${post.slug}`}
					href={`/review?slug=${post.slug}&apiRoute=review`}
					>
					<article className="review-preview">
						<MoviePoster tmdb_id={post.acf.tmdb_id} />
						<h2>{post.title.rendered}</h2>
						<div className="review"
							dangerouslySetInnerHTML={{
								__html: post.excerpt.rendered
							}}
						/>
						<PubDate published={post.date} modified={post.modified} />
					</article>
				</Link>
			);
		});

		return (
			<Fragment>
				<Menu backToHome={false}/>
				<section className="container main-block post-loop">
					{reviews}
				</section>
			</Fragment>
		);
	}
}

export default PageWrapper(Index);
