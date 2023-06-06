import { h, Component } from "preact";
import * as config from "../config.json";
// import style from "../../style/index.less";
import style from "./index.css";

export default class PhotoCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentImageIndex: 0,
			photos: [],
			photosDesc: [],
			fetched: false,
			error: null,
		};
		this.fetchPhotos(this.props.query, this.props.count);
	}

	componentDidUpdate(prevProps) {
		// Fetch photos when the city changes
		console.log("comp update");
		console.log(this.props.query);
		console.log(prevProps.query);
		if (this.props.query !== prevProps.query) {
			this.fetchPhotos(this.props.query, this.props.count);
		}
	}

	fetchPhotos = (query, count) => {
		const clientId = config.unsplashClientId;
		const url = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${query}&count=${count}`;

		fetch(url)
			.then((response) => response.json())
			.then(this.parsePhotoResponse)
			.catch(this.handleFetchError);
	};

	handleFetchError = (error) => {
		// Update the component state with the fetch error
		this.setState({
			photos: [],
			fetched: false,
			error: error,
		});
	};

	parsePhotoResponse = (response) => {
		// Extract the photo URLs from the API response
		const photos = response.map((photo) => photo.urls.regular);
		const photosDesc = response.map((photo) => photo.location.name);

		// Update the component state with the fetched photos
		this.setState({
			photos: photos,
			photosDesc: photosDesc,
			fetched: true,
			error: null,
		});
	};

	handlePrevClick = () => {
		// goes back to previous image when clicked on previous button
		if (this.state.currentImageIndex == 0) {
			this.setState({
				currentImageIndex: this.state.photos.length - 1,
			});
		} else {
			this.setState({
				currentImageIndex:
					(this.state.currentImageIndex - 1) % this.state.photos.length,
			});
		}
	};

	handleNextClick = () => {
		this.setState({
			// goes back to previous image when clicked on previous button
			currentImageIndex:
				(this.state.currentImageIndex + 1) % this.state.photos.length,
		});
	};

	render() {
		return (
			<div>
				{/* checks the state and also the length of photos and based on the output it renders */}
				{this.state.fetched && this.state.photos.length > 0 && (
					<div>
						<div className={style.wide_image_cont}>
							<img
								className={style.wide_image}
								src={this.state.photos[this.state.currentImageIndex]}
							></img>
							<div className={style.wide_image_caption}>
								<div>{this.state.photosDesc[this.state.currentImageIndex]}</div>
							</div>
						</div>
						{this.state.photos.length > 1 && (
							<div className={style.img_btn_cont}>
								<button
									className={style.img_btn}
									onClick={this.handlePrevClick}
								>
									Prev
								</button>
								<button
									className={style.img_btn}
									onClick={this.handleNextClick}
								>
									Next
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}
