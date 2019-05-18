import { Component } from "react";

class PubDate extends Component {
    constructor() {
		super();
    }
    
    ordinalWithSuffix(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

	render() {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const pubDate = new Date.UTC(this.props.published);
        const pubDateString = monthNames[pubDate.getMonth()] + " " + this.ordinalWithSuffix(pubDate.getDate()) + ", " + pubDate.getFullYear();
        
        const modDate = new Date(this.props.modified);
        const modDateString = "Last edited: " + monthNames[modDate.getMonth()] + " " + this.ordinalWithSuffix(modDate.getDate()) + ", " + modDate.getFullYear();
        
        return (
            <time pubdate="true" dateTime={pubDate} title={modDateString}>{pubDateString}</time>
		)
	}

}

export default PubDate;