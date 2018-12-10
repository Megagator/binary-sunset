import fetch from "isomorphic-unfetch";
import Error from "next/error";
import React, { Component } from "react";

import MovieBackdrop from "../components/MovieBackdrop";
import MoviePoster   from "../components/MoviePoster";
import PubDate       from "../components/PubDate";
import PageWrapper   from "../components/PageWrapper";

import { Config } from "../config.js";

class Review extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();
        return { post };
    }

    render() {
        if (!this.props.post.title) return <Error statusCode={404} />;
        // console.log(this.props);

        return (
            <article className="container main-block">
                <header>
                    <div className="backdrop-wrapper">
                        <MovieBackdrop tmdbid={this.props.post.acf.tmdb_id} title={this.props.post.title.rendered}/>
                    </div>
                    <MoviePoster tmdbid={this.props.post.acf.tmdb_id} />
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
        );
    }
}

export default PageWrapper(Review);
