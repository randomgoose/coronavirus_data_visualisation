import React from 'react';
import mapboxgl from 'mapbox-gl';
// import geoDataChina from '../data/china-province.geojson'
import { mousemove } from '../redux/action-creators'
import { connect } from 'react-redux'
import geoDataChina from "../data/china-province.json"
import geoDataWorld from "../data/countries.json" 
import virusDataWorld from "../data/world_timeline.json"

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const stops = [
        [0, "#ffffff"],
        [10, "#ffd7cb"],
        [100, "#f0b19f"],
        [1000, "#de8c75"],
        [10000, "#ca664d"],
        [100000, "#b43e27"],
        [200000, "#9b0000"]
]

class Map extends React.Component {
        map
        mapRef = React.createRef()
        
        state = {
                hoveredCountryId: null
        }

        componentDidUpdate() {
                // virusDataWorld.forEach(i => {
                //         const country = geoDataWorld.features.find(feature => feature.properties.ADMIN === i.country)
                //         if (country) {
                //                 const confirmedCases = i.timeline.find(date => date.date === this.props.date).confirmed
                //                 if ( confirmedCases >= 0 ) {
                //                         country.properties.CASES = confirmedCases
                //                 }
                //         }
                // })


                virusDataWorld.forEach(i => {
                        const country = geoDataWorld.features.find(feature => feature.properties.ADMIN === i.country)
                        if (country) {

                                i.timeline.forEach(date => {
                                        country.properties[`${date.date}`] = date.confirmed
                                })
                        }
                })


                virusDataWorld[0].timeline.forEach(date => {
                        this.map.setPaintProperty(date.date, 'fill-opacity', 0)
                })

                this.map.setPaintProperty(this.props.date, 'fill-opacity', .5)

                // console.log(this.props)
                // this.props.data_world.confirmed.locations.forEach(i => {
                //         geoDataWorld.features.find(feature => feature.properties.ADMIN === i.country).properties.CASES = i.latest
                // })
        }

        componentDidMount() {
                this.map = new mapboxgl.Map({
                        container: this.mapRef.current,
                        style: "mapbox://styles/mapbox/dark-v10",
                        zoom: 2,
                        center: [-87.618312, 41.866674],
                        pitch: 0,
                        antialias: true
                });

                this.map.on("load", () => {
                        this.map.addSource("provinces", {
                                type: "geojson",
                                data: geoDataChina
                        })

                        this.map.addSource("countries", {
                                type: "geojson",
                                data: geoDataWorld,
                                generateId: true
                        })
                        
                        this.map.addLayer({
                                id: "countries-line",
                                type: "line",
                                source: "countries",
                                paint: {
                                        "line-color": "#666666"
                                }
                        })

                        this.map.addLayer({
                                id: "provinces-fills",
                                type: "fill",
                                source: "provinces",
                                paint: {
                                        "fill-color": "#ff0000",
                                        "fill-opacity": [
                                                "case",
                                                ["boolean", ["feature-state", "hover"], false],
                                                1,
                                                .1
                                        ]
                                }
                        }, 'settlement-label')

                        // virusDataWorld.forEach(i => {
                        //         const country = geoDataWorld.features.find(feature => feature.properties.ADMIN === i.country)
                        //         if (country) {

                        //                 i.timeline.forEach(date => {
                        //                         country.properties[`${date.date}`] = date.confirmed
                        //                 })
                        //         }
                        // })

                        virusDataWorld[0].timeline.forEach(date => {
                                this.map.addLayer({
                                        id: date.date,
                                        type: "fill",
                                        source: "countries",
                                        // visibility: "none",
                                        paint: {
                                                "fill-opacity": date.date === "2020-01-22" ? .5 : 0
                                        }
                                })

                                this.setFill(date.date, date.date)
                        })

                        this.map.addLayer({
                                id: "countries-fill",
                                type: "fill",
                                source: "countries",
                                paint: {
                                        "fill-color": "#ffe400",
                                        "fill-opacity": [
                                                "case",
                                                ["boolean", ["feature-state", "hover"], false],
                                                1,
                                                .1
                                        ]
                                }
                        }, 'settlement-label')

                })

                

                this.map.on("mousemove", "countries-fill", (e) => {

                        this.map.getCanvas().style.cursor = 'pointer'
                        if (e.features.length > 0) {
                                if(this.state.hoveredCountryId) {
                                        this.map.setFeatureState({
                                                source: 'countries',
                                                id: this.state.hoveredCountryId
                                        }, {hover: false})
                                }
                                this.setState({
                                        hoveredCountryId: e.features[0].id 
                                }, () => this.map.setFeatureState({
                                        source: 'countries',
                                        id: this.state.hoveredCountryId
                                }, {hover: true}))
                        }
                })
               
                this.map.on("mouseleave", "countries-fill", () => {
                        if (this.state.hoveredCountryId >= 0) {
                                this.map.setFeatureState({
                                        source: "countries", id: this.state.hoveredCountryId
                                }, { hover: false })
                        }

                        this.setState({
                                hoveredCountryId: null
                        })
                })

                this.map.on("mousemove", "provinces-fills", (e) => {

                        this.map.getCanvas().style.cursor = 'pointer'
                        if (e.features.length > 0) {
                                if (this.props.hoveredProvinceId >= 0) {
                                        this.map.setFeatureState({
                                                source: "provinces", id: this.props.hoveredProvinceId
                                        }, { hover: false })
                                }

                                this.props.mousemove(
                                        e.features[0].id,                                               // Identifier of the hovered province  
                                        [e.originalEvent.clientX, e.originalEvent.clientY],             // Position of the mouse cursor
                                        e.features[0].properties.NAME,                                  // Name of the hovered province
                                        e.features[0].properties.PROVINCE                               // Pinyin of the hovered province
                                )
                                this.map.setFeatureState({ source: "provinces", id: this.props.hoveredProvinceId }, {
                                        hover: true
                                })
                        }
                })

                this.map.on("mouseleave", "provinces-fills", () => {
                        if (this.props.hoveredProvinceId >= 0) {
                                this.map.setFeatureState({
                                        source: "provinces", id: this.props.hoveredProvinceId
                                }, { hover: false })
                        }

                        this.props.mousemove(null)

                })

                this.map.addControl(new mapboxgl.FullscreenControl());
                
                this.map.on("idle", (e) => {
                        // if(this.map.areTilesLoaded()){console.log("done")}
                        // console.log(e)
                        // if(this.map.getLayer('2020-04-22')) {
                                console.log('great')
                        // }
                })
        }

        setFill(layerId, properties) {
                this.map.setPaintProperty(layerId, 'fill-color', {
                  property: layerId,
                  stops: stops
                });    
              }
            

        render() {
                return (
                        <div className="Map">
                                <div className="absolute top right left bottom" ref={this.mapRef}></div>
                                <div className=""></div>
                        </div>
                );
        }
}

function mapStateToProps(state) {
        return state
}

const mapDispatchToProps = {
        mousemove
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);