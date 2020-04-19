import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import './sass/main.scss'
import Map from './components/Map'
// import Card from './components/Card'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class App extends React.Component {

  render() {
    return (
      <>
        <Map />
        <Card />
      </>
    );
  }
}
  
export default App;