import React from 'react';
import mapboxgl from 'mapbox-gl';
// import geoData from '../data/china-province.geojson'
import { mousemove } from '../redux/action-creators'
import { connect } from 'react-redux'
const geoData = require("../data/china-province.geojson")
const geoJSON = require("geojson")

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
                                data: geoData
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
                                                0
                                        ]
                                }
                        })

                        this.setFill()
                })

                console.log(this.map.querySourceFeatures('provinces', {
                        filter: ["==", "id", 2]
                }))

                this.map.on("mousemove", "provinces-fills", (e) => {
                        console.log(e.features)
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
                        console.log(this.map.getFeatureState({id: this.props.hoveredProvinceId, source: "provinces"}))
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
                        const locationData = this.props.data.locations
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
                this.map.setPaintProperty('provinces-fills', 'fill-color', {
                  property: "GEO_ID",
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