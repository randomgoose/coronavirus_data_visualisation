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
        

        componentDidUpdate() {
                virusDataWorld.forEach(i => {
                        const country = geoDataWorld.features.find(feature => feature.properties.ADMIN === i.country)
                        if (country) {
                                const confirmedCases = i.timeline.find(date => date.date === this.props.date).confirmed
                                // console.log(confirmedCases)
                                if ( confirmedCases >= 0 ) {
                                        country.properties.CASES = confirmedCases
                                }
                                
                        }
                })
                
                if (this.map.getSource('countries')) {
                        this.map.getSource('countries').setData(geoDataWorld)
                }

                this.setFill()
                

                this.props.data_china.locations.forEach(i => {
                        geoDataChina.features.find(feature => feature.properties.PROVINCE === i.province).properties.CASES = i.latest.confirmed
                })

                // this.map.removeLayer("cases-fills-world")



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
                        antialias: true,
                        generateId: true
                });

                this.map.on("load", () => {
                        this.map.addSource("provinces", {
                                type: "geojson",
                                data: geoDataChina
                        })

                        this.map.addSource("countries", {
                                type: "geojson",
                                data: geoDataWorld
                        })

                        this.map.addLayer({
                                id: "cases-fills-world",
                                type: "fill",
                                source: "countries"
                        }, 'settlement-label')


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

                        this.setFill()
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

                this.map.on("click", "provinces-fills", () => {
                        const locationData = this.props.data_china.locations
                        const data = locationData.find(item => item.province === this.props.hoveredProvincePinyin)

                        this.map.flyTo({
                                center: [
                                        data.coordinates.longitude,
                                        data.coordinates.latitude
                                ],
                                speed: 0.3,
                                zoom: 4,
                                pitch: 60
                        })

                })

                this.map.addControl(new mapboxgl.FullscreenControl());
                
        }

        setFill() {
                this.map.setPaintProperty('cases-fills-world', 'fill-color', {
                  property: "CASES",
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