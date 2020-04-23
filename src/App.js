import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import './sass/main.scss'
import Map from './components/Map'
import TimeSlider from './components/TimeSlider/TimeSlider' 
import Tooltip from './components/Tooltip/Tooltip'
import Dashboard from './components/Dashboard'
import { connect } from 'react-redux'
import { fetchData, fetchAllData } from './redux/action-creators'


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchData()
    this.props.fetchAllData()
  }

  render() {

    return (
      <>
        <Dashboard />
        {/* <Slider defaultValue={30} /> */}
        <Tooltip coordinates={this.props.coordinates} data={this.props.data} />
        <Map />
      </>
    );
  }
}
 
function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = {
  fetchData,
  fetchAllData
}

export default connect(mapStateToProps, mapDispatchToProps)(App);