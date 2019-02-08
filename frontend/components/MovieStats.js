import React, { Component } from "react";
import Api from '../utils/Api';
// import Link from "next/link";

const Fragment = React.Fragment;

class MovieStats extends Component {
	constructor() {
		super();

		this.state = {
			meta: ''
		}
	}

	componentWillMount() {
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

	hideStatsCard() {
		const statsCard = document.querySelector('.stats-card');
		const statsCardShadow = document.querySelector('.stats-card-shadow');

		statsCard.classList.remove('show');
		statsCardShadow.classList.remove('show');
	}
	
	render() {
		// console.log(typeof this.state.meta);
		if (this.state.meta == "") {
			return <div className="stats-card"></div>;
		}else{
			const data = JSON.parse(this.state.meta);

			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const releaseDate = new Date( data.release_date );

			return (
				<Fragment>
					<div className="stats-card-shadow" onClick={this.hideStatsCard}></div>
					<div className="stats-card">
						<h2><i>{this.props.title}</i></h2>
						<hr/>
						<p className="synopsis"><b>Synopsis:</b><br/>{data.overview}</p>
						<ul>
							<li><b>Genre:</b> {data.genres.map((genre, i) => {
									return (<span key={i} className="tag">{genre.name}</span>)
								})
							}</li>
							<li><b>Release Date:</b> {releaseDate.toLocaleDateString("en-US", options)}</li>
							<li><b>Tagline:</b> {data.tagline}</li>
							<li><b>Community Rating:</b> {data.vote_average}/10 ({data.vote_count.toLocaleString()} votes)</li>
							<li><b>Production Countries:</b> 
								<ul>{data.production_countries.map((countries, i) => {
									return (<li key={i}>{countries.name}</li>)
								})
							}
								</ul>
							</li>
							<li><b>Production Companies:</b> 
								<ul>{data.production_companies.map((companies, i) => {
									return (<li key={i}>{companies.name}</li>)
								})
							}
								</ul>
							</li>
							{ data.budget > 0 &&
								<li><b>Budget:</b> ${data.budget.toLocaleString()}</li>
							}
							{ data.revenue > 0 &&
								<li><b>Revenue:</b> ${data.revenue.toLocaleString()}</li>
							}
							<li><b>Website:</b> <a href={data.homepage}>{data.homepage}</a></li>
						</ul>
					</div>
				</Fragment>
			);
		}
	}

}

export default MovieStats;