import { h, render, Component } from "preact";
import Router from "preact-router";
import EntertaintmentSection from "./Entertaintment";
import FoodSection from "./Food";
import LandmarksSection from "./Landmarks";
import TransportSection from "./Transport";
import HomeSection from "./Home";
import NavBar from "./NavBar";

export default class IphonePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: "London",
			// setting the location to 'London' as default when the app loads for first time
		};
	}

	setCity = (city) => {
		this.setState({
			city: city,
		});
	};

	render() {
		return (
			<div>
				{/* Using router for easier navigations between Home page and other tourist specific pages */}
				<Router>
					<FoodSection path="/food" city={this.state.city}></FoodSection>
					<EntertaintmentSection
						path="/entertainment"
						city={this.state.city}
					></EntertaintmentSection>
					<HomeSection
						path="/"
						city={this.state.city}
						setCity={this.setCity}
					></HomeSection>
					<LandmarksSection
						path="/landmarks"
						city={this.state.city}
					></LandmarksSection>
					<TransportSection
						path="/transport"
						city={this.state.city}
					></TransportSection>
				</Router>
				<NavBar city={this.state.city}></NavBar>
			</div>
		);
	}
}
