import { h, Component } from "preact";
import PhotoCarousel from "./PhotoCarousel";
// import style from "../../style/index.less";
import style from "./index.css";

export default class TransportSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* Transport section which displays the relevant transport modes based on which city the user enters  */}
				<div className={style.page_title}>{this.props.city} Transport</div>
				<PhotoCarousel
					query={`${this.props.city} transport`}
					count={3}
				></PhotoCarousel>
			</div>
		);
	}
}
