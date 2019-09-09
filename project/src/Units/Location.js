import React from "react";
import {geolocated, geoPropTypes} from 'react-geolocated';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import {Button, Col, Row} from "react-bootstrap";

class Location extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userLat: 0,
            userLon: 0,
            zoom: 12,
            data: [],
            dataLoaded: false
        };

        this.getGeolocation = this.getGeolocation.bind(this);
    }

    async componentDidMount() {
        const location = this.getGeolocation();

        const response = await fetch('http://localhost:8000/api/units',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        this.units = await response.json();
        let data = [];
        this.units.forEach((unit) => data = [...data, {name: unit.name, coords: {lat: 46.770962 + Math.random(), lon: 23.597567 + Math.random()}}]);

        this.setState({
            userLat: location.lat,
            userLon: location.lon,
            data: data,
            dataLoaded: true
        });
    }

    getGeolocation() {
        if (this.props.isGeolocationAvailable) {
            if (this.props.isGeolocationEnabled) {
                if (this.props.coords) {
                    return ({
                        lat: this.props.coords.latitude,
                        lon: this.props.coords.longitude
                    })
                }
            }
        }
        return ({
            lat: 0, lon: 0
        });
    }

    render() {
        if (this.state.dataLoaded) {
            const coords = this.getGeolocation();
            return (
                <div className={'container'}>
                    <Row className={'justify-content-md-center'}>
                        <Col>
                            <Map center={[coords.lat, coords.lon]}
                                 zoom={this.state.zoom}
                                 width={1200}
                                 height={420}
                            >
                                <Marker anchor={[coords.lat, coords.lon]} payload={1}/>
                                <Overlay anchor={[coords.lat, coords.lon]} offset={[-15, 20]}>
                                    Your location
                                </Overlay>
                                {this.state.data.map((unit) => {
                                    return (
                                        <Marker anchor={[unit.coords.lat, unit.coords.lon]} key={`Marker-${unit.name}`}/>
                                    );
                                })}
                                {this.state.data.map((unit) => {
                                    return (
//                                            <Marker anchor={[unit.coords.lat, unit.coords.lon]} key={`Marker-${unit.name}`}/>
                                            <Overlay anchor={[unit.coords.lat, unit.coords.lon]} offset={[-15, 20]}
                                                     key={`Overlay-${unit.name}`}>
                                                {unit.name}
                                            </Overlay>
                                    );
                                })}
                            </Map>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                            <Button variant={'danger'} onClick={() => {
                                if (this.state.zoom < 18)
                                    this.setState({zoom: this.state.zoom + 1});
                            }}>
                                +
                            </Button>
                        </Col>
                        <Col md={1}>
                            <Button variant={'danger'} onClick={() => {
                                if (this.state.zoom > 3)
                                    this.setState({zoom: this.state.zoom - 1});
                            }}>
                                -
                            </Button>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return null;
        }
    }
}

Location.propTypes = {...Location.propTypes, ...geoPropTypes};

export default geolocated()(Location);
