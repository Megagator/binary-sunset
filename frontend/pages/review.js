import fetch from "isomorphic-unfetch";
import Error from "next/error";
import React, { Component } from "react";

import MovieBackdrop from "../components/MovieBackdrop";
import MoviePoster   from "../components/MoviePoster";
import MovieStats    from "../components/MovieStats";
import PubDate       from "../components/PubDate";
import PageWrapper   from "../components/PageWrapper";

import { Config } from "../config.js";
import Api from '../utils/Api';
import Menu from "../components/Menu";
const Fragment = React.Fragment;


class Review extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();
        return { post };
    }

    
	showStatsCard() {
		const statsCard = document.querySelector('.stats-card');
		const statsCardShadow = document.querySelector('.stats-card-shadow');

		statsCard.classList.add('show');
		statsCardShadow.classList.add('show');
	}

    render() {
        if (!this.props.post.title) return <Error statusCode={404} />;
        // console.log(this.props);

        const requestUrl = Api.makeRequestUrl(this.props.post.acf.tmdb_id);
        const apiRequest = Api.get(requestUrl)

        return (
            <Fragment>
            <Menu/>
            <article className="container main-block review-single">
                <MovieStats apiResult={apiRequest} title={this.props.post.title.rendered}></MovieStats>
                <header>
                    <div className="backdrop-wrapper">
                        <MovieBackdrop apiResult={apiRequest} title={this.props.post.title.rendered}/>
                    </div>
                    <MoviePoster apiResult={apiRequest} onClick={this.showStatsCard}/>
                    <div className="byline">
                        <address className="author">{this.props.post.author}</address>
                        <PubDate published={this.props.post.date} modified={this.props.modified} />
                    </div>
                </header>
                <section
                    dangerouslySetInnerHTML={{
                        __html: this.props.post.content.rendered
                    }}
                    />
            </article>
            <div className={[this.props.post.acf.recommendation.value, "movie-recommendation ticket"].join(' ')}>
                <p>Recommendation:</p>
                <div className="rip"></div>
                <div className="result-stub">
                    <div className="result">{this.props.post.acf.recommendation.label}</div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default PageWrapper(Review);
