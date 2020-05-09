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
	}

	/**
	 * @description function used for initialise google map
	 */
    initMap() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: Common.two,
			center: {lat: Common.defaultLocation.lat, lng: Common.defaultLocation.lng},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });
	 }

	 /**
	 * @description function used for add cluster and marker on map
	 */
	 updateMarkerData (data, isNext: string) {
		if (data.length && !isNext) {
			this.map.setOptions({
				center: {lat: data[Common.zero].location[Common.one], lng: data[Common.one].location[Common.zero]}
			});
		}
		for (let i = 0; i < data.length; i++) {
			const category = data[i].category;
			const markerImage = this.getMarkerImage(category);
			if (data[i].location && data[i].location[Common.zero] && data[i].location[Common.one]) {
				const marker = new google.maps.Marker({
					position: new google.maps.LatLng(data[i].location[Common.one], data[i].location[Common.zero]),
					map: this.map,
					icon: markerImage,
				  });
				  const infoWindow = new google.maps.InfoWindow();
				  const dataInfo = `<div class='ui-window-info'>
				  <div class='ui-window-title'>${data[i].title}</div>
				  <div class='ui-window-desc'>${data[i].description}</div>
				  <div class='fc-location'><span class='fc-location-icon'>
				  <img src="/assets/images/icon-map.png" alt="icon-map"/>
				  </span>
				${data[i].country}</div>
				  </div>`;
				  google.maps.event.addListener(marker, 'click', function (e) {
					  infoWindow.setContent(dataInfo);
					  infoWindow.open(this.map, marker);
				  });
				  this.markers.push(marker);
			}
		}
		const clusterOptions = {
			zoom: Common.four,
			imagePath: Common.clusterIcon,
			gridSize: Common.gridSize
		};
		const markerCluster = new MarkerClusterer(this.map, this.markers, clusterOptions);
		const styles = markerCluster.getStyles();
		for (let j = 0; j < styles.length; j++) {
			styles[j].width = Common.clusterIconSize;
			styles[j].height = Common.clusterIconSize;
		}
	 }

	 /**
	  * @description function used for get marker image
	  */
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
		this.latitude = Common.defaultLocation.lat;
		this.longitude = Common.defaultLocation.lng;
		navigator.geolocation.getCurrentPosition((position) => {
			if (position) {
				// this.latitude = position.coords.latitude;
				// this.longitude = position.coords.longitude;
				this.initMap();
				this.searchMapEvents();
			} else {
				this.initMap();
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
			const phqEvents = res['results'];
			/*const phqEvents = [{location: [147.154312, -31.563910], title: 'public holidays',
		description: 'xyz abc abc', category: 'public-holidays'},
			{location: [150.363181, -33.718234], title: 'aaa',
		description: 'abc abc abc', category: 'festivals'}];*/
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
