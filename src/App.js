import React from 'react';
import mapboxgl from 'mapbox-gl'
import './App.css';
import './sass/main.scss'
import Map from './components/Map'
import Tooltip from './components/Tooltip/Tooltip'
import Dashboard from './components/Dashboard'
import {connect} from 'react-redux'
import {fetchData, fetchAllData} from './redux/action-creators'
import virusDataChina from './data/china_timeline'
import virusDataWorld from './data/world_timeline'
import ProgressBar from "./components/ProgressBar";


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class App extends React.Component {

    componentDidMount() {
        this.props.fetchData()
        this.props.fetchAllData()
    }

    render() {

        return (
            <>
                {/*{ this.props.layersLoaded ? null : <ProgressBar />}*/}
                <Dashboard date={this.props.date}/>
                {/* <Slider defaultValue={30} /> */}
                <Tooltip coordinates={this.props.coordinates} data={virusDataWorld}/>
                <Map/>
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