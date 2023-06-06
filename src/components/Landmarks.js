import { h, Component } from "preact";
import PhotoCarousel from "./PhotoCarousel";
// import style from "../../style/index.less";
import style from "./index.css";

export default class LandmarksSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* Landmark section which displays the relevant landmarks to visit based on which city the user enters  */}
				<div className={style.page_title}>{this.props.city} Landmarks</div>
				<PhotoCarousel
					query={`${this.props.city} landmarks`}
					count={3}
				></PhotoCarousel>
			</div>
		);
	}
}
