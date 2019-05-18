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

	componentDidMount() {
		this.props.apiResult
			.then( (content) => {
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
			return (
			<div className="backdrop">
				<h1>{this.props.title}</h1>
			</div>
			);
		}else{
			const data = JSON.parse(this.state.meta);
			return (
				<div className="backdrop">
					<img
						sizes = "(min-width: 852px) 852px, (min-width: 852px) 100vw"
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
