import React from 'react';

import { PhqEvent } from '../../interface/PhqEvent';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';
import ConfigData from '../../constant/config';

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
		const locations = [
			{lat: -31.563910, lng: 147.154312},
			{lat: -33.718234, lng: 150.363181},
			{lat: -33.727111, lng: 150.371124},
			{lat: -33.848588, lng: 151.209834},
			{lat: -33.851702, lng: 151.216968},
			{lat: -34.671264, lng: 150.863657},
			{lat: -35.304724, lng: 148.662905},
			{lat: -36.817685, lng: 175.699196},
			{lat: -36.828611, lng: 175.790222},
			{lat: -37.750000, lng: 145.116667},
			{lat: -37.759859, lng: 145.128708},
			{lat: -37.765015, lng: 145.133858},
			{lat: -37.770104, lng: 145.143299},
			{lat: -37.773700, lng: 145.145187},
			{lat: -37.774785, lng: 145.137978},
			{lat: -37.819616, lng: 144.968119},
			{lat: -38.330766, lng: 144.695692},
			{lat: -39.927193, lng: 175.053218},
			{lat: -41.330162, lng: 174.865694},
			{lat: -42.734358, lng: 147.439506},
			{lat: -42.734358, lng: 147.501315},
			{lat: -42.735258, lng: 147.438000},
			{lat: -43.999792, lng: 170.463352}
		];
		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 3,
			center: {lat: -28.024, lng: 140.887},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });

		  const markers = [];
		  for (let i = 0; i < locations.length; i++) {
			const marker = new google.maps.Marker({
				position: {lat: locations[i].lat, lng: locations[i].lng},
				map: map,
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 20,
					fillColor: '#00A2D3',
					fillOpacity: 0.9,
					strokeWeight: 0
				},
			  });
			  const infoWindow = new google.maps.InfoWindow();
			  google.maps.event.addListener(marker, 'click', function (e) {
				  infoWindow.setContent('Hello');
				  infoWindow.open(map, marker);
			  });
			  markers.push(marker);
		  }

		  // Options to pass along to the marker clusterer
		const clusterOptions = {
			// zoom: 2,
			imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			// gridSize: 30,
		};

		// Add a marker clusterer to manage the markers.
		const markerCluster = new MarkerClusterer(map, markers, clusterOptions);
		  // Change styles after cluster is created
		const styles = markerCluster.getStyles();
		for (let i = 0; i < styles.length; i++) {
			// styles[i].className = `custom-clustericon-${i}`;
		}
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
			this.setState({ phqEvents: this.state.phqEvents.concat(res['results']) });
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
