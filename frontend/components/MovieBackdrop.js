import React, { Component } from "react";
// import Link from "next/link";
import Api from '../utils/Api';

// const Fragment = React.Fragment;

class MovieBackdrop extends Component {
	constructor() {
		super();

		this.backdropSizes = {
			"small": '/w300',
			"medium": '/w780',
			"large": '/w1280',
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
				// console.log("got from api: ", content, "type: ", typeof content);
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
			return <div className="backdrop"></div>;
		}else{
			const data = JSON.parse(this.state.meta);
			return (
				<div className="backdrop">
					<img
						src = {Api.makeImageUrl(data.backdrop_path, this.backdropSizes.medium)}
						srcSet = {`
							${Api.makeImageUrl(data.backdrop_path, this.backdropSizes.small)} 300w,
							${Api.makeImageUrl(data.backdrop_path, this.backdropSizes.medium)} 780w,
							${Api.makeImageUrl(data.backdrop_path, this.backdropSizes.large)} 1280w,
							${Api.makeImageUrl(data.backdrop_path, this.backdropSizes.original)} 3840w,
						`}
					/>
					<h1>{this.props.title}</h1>
				</div>
			);
		}
	}

}

export default MovieBackdrop;
