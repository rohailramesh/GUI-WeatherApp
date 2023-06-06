import { h, render, Component } from "preact";
import { route } from "preact-router";
// import style from "../../style/index.less";
import style from "./index.css";

const pages = {
	"/food": 0,
	"/entertainment": 1,
	"/": 2,
	"/landmarks": 3,
	"/transport": 4,
};
// the follwoing functions redirect user to the relevant pages when they click on the buttons through routing
export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: pages[window.location.pathname],
		};
		console.log("RECONSTRUCT");
		console.log(this.state.activePage);
	}

	goToPage = (page) => {
		pageIndex = pages[page];
		if (pageIndex == null) return;

		route(page);
		this.setState({
			activePage: pageIndex,
		});
	};

	goToFood = () => {
		if (this.state.activePage == 0) return;
		route("/food");
		this.setState({
			activePage: 0,
		});
		console.log(this.state.activePage);
	};

	goToEntertainment = () => {
		if (this.state.activePage == 1) return;
		route("/entertainment");
		this.setState({
			activePage: 1,
		});
		console.log(this.state.activePage);
	};

	goToHome = () => {
		if (this.state.activePage == 2) return;
		route("/");
		this.setState({
			activePage: 2,
		});
		console.log(this.state.activePage);
	};

	goToLandmarks = () => {
		if (this.state.activePage == 3) return;
		route("/landmarks");
		this.setState({
			activePage: 3,
		});
		console.log(this.state.activePage);
	};

	goToTransport = () => {
		if (this.state.activePage == 4) return;
		route("/transport");
		this.setState({
			activePage: 4,
		});
		console.log(this.state.activePage);
	};

	render() {
		return (
			<div className={style.nav_bar}>
				<div
					className={
						this.state.activePage != 0
							? style.nav_item
							: style.nav_item_selected
					}
					onClick={this.goToFood}
				>
					{/* calling those functions to actually navigate them */}
					<img
						className={style.nav_img}
						src="../../assets/icons/food.png"
					></img>
				</div>
				<div
					className={
						this.state.activePage != 1
							? style.nav_item
							: style.nav_item_selected
					}
					onClick={this.goToEntertainment}
				>
					<img
						className={style.nav_img}
						src="../../assets/icons/person.png"
					></img>
				</div>
				<div
					className={
						this.state.activePage != 2
							? style.nav_item
							: style.nav_item_selected
					}
					onClick={this.goToHome}
				>
					<img className={style.nav_img} src="../../assets/icons/sun.png"></img>
				</div>
				<div
					className={
						this.state.activePage != 3
							? style.nav_item
							: style.nav_item_selected
					}
					onClick={this.goToLandmarks}
				>
					<img
						className={style.nav_img}
						src="../../assets/icons/building.png"
					></img>
				</div>
				<div
					className={
						this.state.activePage != 4
							? style.nav_item
							: style.nav_item_selected
					}
					onClick={this.goToTransport}
				>
					<img className={style.nav_img} src="../../assets/icons/bus.png"></img>
				</div>
			</div>
		);
	}
}
