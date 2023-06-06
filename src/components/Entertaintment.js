import { h, Component } from "preact";
import PhotoCarousel from "./PhotoCarousel";
// import style from "../../style/index.less";
import style from "./index.css";

export default class EntertaintmentSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			//Activity section which displays the relevant activities based on which city the user enters
			<div>
				<div className={style.page_title}>{this.props.city} Activities</div>
				{/* Passing the city as a prop in photo carousel to get relevant images for the carousel */}
				<PhotoCarousel
					query={`${this.props.city} entertainment`}
					count={3}
				></PhotoCarousel>
			</div>
		);
	}
}
