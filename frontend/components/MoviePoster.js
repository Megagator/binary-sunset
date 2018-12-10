import React, { Component } from "react";
// import Link from "next/link";
import Api from '../utils/Api';

// const Fragment = React.Fragment;

class MovieBackdrop extends Component {
	constructor() {
		super();

		this.posterSizes = {
			"small": '/w92',
			"medium": '/w185',
			"large": '/w500',
			"original": '/original'
		};

		this.state = {
			meta: ''
		}
	}

	componentWillMount() {
		const requestUrl = Api.makeRequestUrl(this.props.tmdbid);
	
		Api.get(requestUrl)
			.then( (content) => {
				console.log("got from api: ", content, "type: ", typeof content);
				this.setState({
					meta: content
				});
			})
			.catch( (error) => {
				console.error(error);
			});
	}
	
	render() {
		// console.log(typeof this.state.meta);
		if (this.state.meta == "") {
			return <div className="poster"></div>;
		}else{
			const data = JSON.parse(this.state.meta);
			return (
				<div className="poster">
					<img
						src = {Api.makeImageUrl(data.poster_path, this.posterSizes.medium)}
						srcSet = {`
							${Api.makeImageUrl(data.poster_path, this.posterSizes.small)} 92w,
							${Api.makeImageUrl(data.poster_path, this.posterSizes.medium)} 185w,
							${Api.makeImageUrl(data.poster_path, this.posterSizes.large)} 500w,
							${Api.makeImageUrl(data.poster_path, this.posterSizes.original)} 1200w,
						`}
					/>
				</div>
			);
		}
	}

}

export default MovieBackdrop;
