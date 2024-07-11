/*global google*/
import React, { Component } from "react";
import {
    GoogleMap,
    DirectionsService,
    DirectionsRenderer,
    LoadScript
} from "@react-google-maps/api";

class Map extends Component {
    state = {
        directions: null
    };

    componentDidMount() {
        const directionsService = new google.maps.DirectionsService();

        const origin = { lat: 40.756795, lng: -73.954298 };
        const destination = { lat: 41.756795, lng: -78.954298 };

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    render() {
        return (
            <div style={{ height: "500px", width: "500px" }}>
                <LoadScript
                    googleMapsApiKey="YOUR_API_KEY"
                >
                    <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        center={{ lat: 40.756795, lng: -73.954298 }}
                        zoom={13}
                    >
                        {this.state.directions && (
                            <DirectionsRenderer
                                options={{ directions: this.state.directions }}
                            />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}

export default Map;
