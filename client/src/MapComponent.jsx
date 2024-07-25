import React, { useEffect } from 'react';
import './style.css';

const MapComponent = () => {
  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyACR54EJurDEozVMCEc3Wut8SuseSCWl_g&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    // Define the initMap function
    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 43.71211226493189, lng: -79.39393597358205 },
        zoom: 11,
      });

      new AutocompleteDirectionsHandler(map);
    };

    class AutocompleteDirectionsHandler {
      constructor(map) {
        this.map = map;
        this.originPlaceId = '';
        this.destinationPlaceId = '';
        this.travelMode = google.maps.TravelMode.WALKING;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);

        const originInput = document.getElementById('origin-input');
        const destinationInput = document.getElementById('destination-input');
        const modeSelector = document.getElementById('mode-selector');

        const originAutocomplete = new google.maps.places.Autocomplete(originInput, { fields: ['place_id'] });
        const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, { fields: ['place_id'] });

        this.setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
        this.setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
        this.setupClickListener('changemode-driving', google.maps.TravelMode.BICYCLING);
        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      setupClickListener(id, mode) {
        const radioButton = document.getElementById(id);
        radioButton.addEventListener('click', () => {
          this.travelMode = mode;
          this.route();
        });
      }

      setupPlaceChangedListener(autocomplete, mode) {
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert('Please select an option from the dropdown list.');
            return;
          }
          if (mode === 'ORIG') {
            this.originPlaceId = place.place_id;
          } else {
            this.destinationPlaceId = place.place_id;
          }
          this.route();
        });
      }

      route() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        this.directionsService.route(
          {
            origin: { placeId: this.originPlaceId },
            destination: { placeId: this.destinationPlaceId },
            travelMode: this.travelMode,
          },
          (response, status) => {
            if (status === 'OK') {
              this.directionsRenderer.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          }
        );
      }
    }
  }, []);

  return (
    <div>
        <div id="map" style={{ height: '82vh' }}></div>
        <input id="origin-input" className="controls" type="text" placeholder="Enter origin" />
        <input id="destination-input" className="controls" type="text" placeholder="Enter destination" />
        <div id="mode-selector" className="controls">
            <input type="radio" name="type" id="changemode-walking" defaultChecked />
            <label htmlFor="changemode-walking">Walking</label>
            <input type="radio" name="type" id="changemode-transit" />
            <label htmlFor="changemode-transit">Transit</label>
            <input type="radio" name="type" id="changemode-driving" />
            <label htmlFor="changemode-driving">Biking</label>
        </div>
    </div>
  );
};

export default MapComponent;
