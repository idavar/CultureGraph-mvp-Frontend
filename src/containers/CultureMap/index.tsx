import React from 'react';
import GoogleMapReact, { Coords } from 'google-map-react' ;
import { PhqEvent } from '../../interface/PhqEvent';
import { apiReq } from '../../helpers';
import Common from '../../constant/common';
import ConfigData from '../../constant/config';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

interface MapEventAppState {
	phqEvents: Array<Partial<PhqEvent>>;
	loading: boolean;
}

interface MapEventProps {
	center: Coords;
	zoom: number;
}

class CultureMap extends React.Component<MapEventProps, MapEventAppState> {
	static defaultProps = {
		center: {
		  lat: 59.95,
		  lng: 30.33
		},
		zoom: 11
	};
	public latitude = Common.zero;
	public longitude = Common.zero;
	constructor(props: MapEventProps) {
		super(props);
		this.state = {
			phqEvents: [],
			loading: false
		};
	}

	componentDidMount() {
		this.getCurrentPosition();
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
		apiReq.predicthqSearchEvent({}, options).then((res: any) => {
			console.log(res['results']);
			this.setState({ phqEvents: this.state.phqEvents.concat(res['results']) });
			if (res.next) {
				options.next = res.next;
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
		<div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: ConfigData.mapKey} }
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text='My Marker'
          />
        </GoogleMapReact>
      </div>
);
	}
}

export default CultureMap;
