import { h, Component } from "preact";
import PhotoCarousel from "./PhotoCarousel";
// import style from "../../style/index.less";
import style from "./index.css";

export default class FoodSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* Food section which displays the relevant food options based on which city the user enters */}
				<div className={style.page_title}>{this.props.city} Food</div>
				<PhotoCarousel
					query={`${this.props.city} food`}
					count={3}
				></PhotoCarousel>
				{/* Passing the city as a prop in photo carousel to get relevant images for the carousel */}
			</div>
		);
	}
}
