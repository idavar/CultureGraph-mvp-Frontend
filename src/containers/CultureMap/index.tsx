import React from 'react';

import { PhqEvent } from '../../interface/PhqEvent';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';

declare let google;
declare let MarkerClusterer;

interface MapEventAppState {
	phqEvents: Array<Partial<PhqEvent>>;
	loading: boolean;
	markers: Array<object>;
}

class CultureMap extends React.Component<{}, MapEventAppState> {
	public map;
	public latitude = Common.zero;
	public longitude = Common.zero;
	public markers = [];
	constructor(props: {}) {
		super(props);
		this.state = {
			phqEvents: [],
			loading: false,
			markers: [],
		};
	}

	componentDidMount() {
		this.setState({ markers: [] });
		this.getCurrentPosition();
		this.initMap();
	}

    initMap() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: Common.four,
			center: {lat: -33.718234, lng: 147.154312},
			mapTypeId: google.maps.MapTypeId.terrain,
			scaleControl: true,
		  });
	 }

	 updateMarkerData (data, isNext: string) {
		 if (data.length && !isNext) {
			this.map.setOptions({
				center: {lat: data[0].location[0], lng: data[1].location[1]}
			});
		}

		for (let i = 0; i < data.length; i++) {
			const category = data[i].category;
			const markerImage = this.getMarkerImage(category);

			const marker = new google.maps.Marker({
			  position: {lat: data[i].location[0], lng: data[i].location[1]},
			  map: this.map,
			  icon: markerImage,
			});
			const infoWindow = new google.maps.InfoWindow();
			const dataInfo = `<div class='ui-window-info'>
			<div class='ui-window-title'>${data[i].title}</div>
			<div class='ui-window-desc'>${data[i].description}</div>
			</div>`;
			google.maps.event.addListener(marker, 'click', function (e) {
				infoWindow.setContent(dataInfo);
				infoWindow.open(this.map, marker);
			});
			this.markers.push(marker);
		}
	 }

	 getMarkerImage (category: string) {
		let markerImage = Common.mapIcon.others;
		if (Common.categoryGroup.holidays.includes(category)) {
			markerImage = Common.mapIcon.holidays;
		} else if (Common.categoryGroup.art.includes(category)) {
			markerImage = Common.mapIcon.art;
		} else if (Common.categoryGroup.festivals.includes(category)) {
			markerImage = Common.mapIcon.festivals;
		} else if (Common.categoryGroup.food.includes(category)) {
			markerImage = Common.mapIcon.food;
		} else if (Common.categoryGroup.music.includes(category)) {
			markerImage = Common.mapIcon.music;
		} else if (Common.categoryGroup.sports.includes(category)) {
			markerImage = Common.mapIcon.sports;
		}
		return markerImage;
	 }

	/**
	 * @description function used for get current position event
	 */
	getCurrentPosition = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			if (position) {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.searchMapEvents();
			} else {
				this.searchMapEvents();
			}
		});
	}

	/**
	 * @description function used for get phq search query string
	 */
	getQurString = (next: string) => {
		let query = '';
		if (!next) {
			this.setState({ phqEvents: [] });
			query = `?category=${Common.allCategory}&state=${Common.phqState}&sort=rank`;
			if (this.latitude !== Common.zero && this.longitude !== Common.zero) {
				query = `${query}&within=${Common.phqKm}km@${this.latitude},${this.longitude}`;
			}
		}
		return query;
	}

	/**
	 * @description function used for search map events
	 */
	searchMapEvents = (options: {query: string, next: string} = {query: '', next: ''}) => {
		this.setState({loading: true});
		options['query'] = this.getQurString(options.next);
		apiReq.predicthqSearchEvent({}, options).then(res => {
			/*const phqEvents = [{location: [-31.563910, 147.154312], title: 'public holidays',
		description: 'xyz abc abc', category: 'public-holidays'},
			{location: [-33.718234, 150.363181], title: 'aaa',
		description: 'abc abc abc', category: 'festivals'}];*/
			const phqEvents = res['results'];
			this.setState({ phqEvents: this.state.phqEvents.concat(res['results']) });
			this.updateMarkerData(phqEvents, options.next);
			if (res['next']) {
				options.next = res['next'];
			 	this.searchMapEvents(options);
			} else {
				this.setState({loading: false});
			}
		}).catch(err => {
			this.setState({loading: false});
		});
	}

	render() {
		return (
			<div className="culster-map" id="map"></div>
);
	}
}

export default CultureMap;
