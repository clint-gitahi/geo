/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

const { width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA  = LATITUDE_DELTA * ASPECT_RATIO

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
});

export default class Tested extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var longy = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: longy,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({ initialPosition: initialRegion})
      this.setState({ markerPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error))
    )
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position)
    // }, (error) => {
    //   console.log(error)
    // })

    this.watchID = navigator.geolocation.watchPosition((positon) => {
      var lat = parseFloat(positon.coords.latitude)
      var longy = parseFloat(positon.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: longy,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      }
      this.setState({ initialPosition: lastRegion })
      this.setState({ markerPosition: lastRegion})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearwatch(this.watchID)
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.initialPosition}
      >
        <MapView.Marker
          coordinate={this.state.markerPosition}
        >
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
        </MapView.Marker>
      </MapView>
    );
  }
}


AppRegistry.registerComponent('Tested', () => Tested);
