import { h, render, Component } from "preact";
import $ from "jquery";
import * as config from "../config.json";
// import style from "../../style/index.less";
import style from "./index.css";
import PhotoCarousel from "./PhotoCarousel";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const weekday = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
// Array of months and weekdays for displaying relevant weather information for correct timings

export default class HomeSection extends Component {
	constructor(props) {
		super(props);

		let date = new Date();
		let dateMod = "th";
		if (date.getDate() < 10 || date.getDate() > 20) {
			switch (date.getDate() % 10) {
				case 1:
					dateMod = "st";
					break;
				case 2:
					dateMod = "nd";
					break;
				case 3:
					dateMod = "rd";
					break;
			}
		}
		let dateStr =
			weekday[date.getDay()] +
			" " +
			date.getDate() +
			dateMod +
			" " +
			monthNames[date.getMonth()] +
			" " +
			date.getFullYear();
		//setting states
		this.state = {
			temp: "",
			display: true,
			locate: "",
			cond: "",
			fetched: false,
			weatherForecast: [],
			futureTempAvg: null, // added state for future temperature average
			showEntertainment: false,
			dateToday: dateStr,
			conditionIcon: "",
			photoUrl: "",
		};
		this.fetchWeatherData();
		this.fetchPhotos();
		//two functions which will fetch weather and relevant picutres for the sections for tourist based on the city user inputs
	}

	handleCityChange = (event) => {
		this.props.setCity(event.target.value);
	}; //function to change the city with most updated value

	getWeatherAndPhoto = () => {
		this.fetchWeatherData();
		this.fetchPhotos();
	}; //gets weather photos for the forecast

	clearCityInput = () => {
		this.search_input.value = "";
	}; //clears the search field

	fetchWeatherData = () => {
		var url =
			"https://api.weatherapi.com/v1/forecast.json?key=" +
			config.weatherApiKey +
			"&q=" +
			this.props.city +
			"&days=4";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseWeatherResponse,
			error: function (req, err) {
				console.log("API call failed " + err);
				window.alert("Could not find city");
			},
		});
	}; //fetching current and future weather forecast from weatherapi.com

	parseWeatherResponse = (forecast) => {
		console.log(forecast);
		var location = forecast.location.name;
		var temp_c = forecast.current.temp_c;
		var conditions = forecast.current.condition.text;
		var conditionIcon = forecast.current.condition.icon;

		var weatherForecast = forecast.forecast.forecastday.map((day) => ({
			day: weekday[new Date(day.date).getDay()],
			date: day.date,
			avg_temp: day.day.avgtemp_c,
			conditions: day.day.condition.text,
			conditionIcon: day.day.condition.icon,
		}));

		this.setState({
			locate: location,
			temp: Math.round(temp_c) + "°C",
			cond: conditions,
			fetched: true,
			display: true,
			weatherForecast: weatherForecast,
			conditionIcon: conditionIcon,
		});

		console.log(weatherForecast);
	}; //parsing the suitable information for out app

	fetchPhotos = () => {
		const clientId = config.unsplashClientId;
		const url = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${this.props.city}&count=1`;

		fetch(url)
			.then((response) => response.json())
			.then(this.parsePhotoResponse)
			.catch(this.handleFetchError);
	};

	handleFetchError = (error) => {
		// Update the component state with the fetch error
		this.setState({
			photoUrl: "",
			fetched: false,
			error: error,
		});
	}; //error handling if API call fails

	parsePhotoResponse = (response) => {
		// Extract the photo URLs from the API response
		const photos = response.map((photo) => photo.urls.regular);

		// Update the component state with the fetched photos
		this.setState({
			photoUrl: photos[0],
			fetched: true,
			error: null,
		});
	};

	capitalise = (s) => {
		return s
			.toLowerCase()
			.split(" ")
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(" ");
	};

	searchSOS = () => {
		window.open(
			`https://www.google.com/search?q=${this.props.city}+emergency+services`,
			"_blank"
		);
	};

	searchPolice = () => {
		window.open(
			`https://www.google.com/search?q=Police+in+${this.props.city}`,
			"_blank"
		);
	};

	searchHospital = () => {
		window.open(
			`https://www.google.com/search?q=Hospitals+in+${this.props.city}`,
			"_blank"
		);
	}; //three functions that redirect user to more important info relevant to their location like police, hospital and SOS

	render() {
		return (
			<div>
				<div className={style.top_header}>
					{this.state.photoUrl && (
						<img className={style.header_bg} src={this.state.photoUrl}></img>
					)}
					{/* displaying relevant weather info for current day */}
					<div className={style.header_date}>{this.state.dateToday}</div>
					<div className={style.header_weather_cont}>
						<div className={style.header_weather_text}>{this.state.temp}</div>
						{this.state.conditionIcon && (
							<img
								className={style.header_weather_icon}
								src={this.state.conditionIcon}
							></img>
						)}
						<div className={style.header_weather_text}>{this.state.cond}</div>
					</div>
				</div>

				<div className={style.search_bar}>
					<img
						className={style.search_icon}
						src="../../assets/icons/search.png"
						onClick={this.getWeatherAndPhoto}
					></img>
					<input
						className={style.search_input}
						type="text"
						value={this.props.city}
						onChange={this.handleCityChange}
						placeholder="City"
						ref={(el) => (this.search_input = el)}
						required
					/>
					{/* adding a picture for the chosen location */}
					<img
						className={style.search_clear}
						src="../../assets/icons/close.png"
						onClick={this.clearCityInput}
					></img>
				</div>

				<div className={style.forecast_cont}>
					{this.state.weatherForecast.slice(0, 4).map((day) => (
						//  displaying the weather forecast for the next three days
						<div className={style.forecast_card}>
							<div className={style.forecast_day}>{day.day.substr(0, 3)}</div>
							<div className={style.forecast_inner_card}>
								<img
									className={style.forecast_icon}
									src={day.conditionIcon}
								></img>
								<div className={style.forecast_temp}>
									{Math.round(day.avg_temp)}°C
								</div>
							</div>
						</div>
					))}
				</div>
				{/* photo carousel with images specific to the location */}
				<PhotoCarousel query={this.props.city} count={1}></PhotoCarousel>
				{/* Emergency options buttons  */}
				<div className={style.emergency_cont}>
					<img
						className={style.emergency_icon}
						src="../../assets/icons/health.png"
						onClick={this.searchHospital}
					></img>
					<img
						className={style.emergency_icon}
						src="../../assets/icons/sos.png"
						onClick={this.searchSOS}
					></img>
					<img
						className={style.emergency_icon}
						src="../../assets/icons/police.png"
						onClick={this.searchPolice}
					></img>
				</div>

				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		);
	}
}
