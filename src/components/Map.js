import React from 'react';
import mapboxgl from 'mapbox-gl';
import geoData from '../data/china-province.geojson'
import countryData from '../data/countries.geojson'
import { mousemove } from '../redux/action-creators'
import { connect } from 'react-redux'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends React.Component {

        mapRef = React.createRef()

        componentDidMount() {

                const map = new mapboxgl.Map({
                        container: this.mapRef.current,
                        style: "mapbox://styles/mapbox/dark-v10",
                        zoom: 2,
                        center: [-87.618312, 41.866674],
                        pitch: 0,
                        antialias: true
                });

                map.on("load", () => {
                        map.addSource("provinces", {
                                type: "geojson",
                                data: geoData
                        })

                        map.addSource("country", {
                                type: "geojson",
                                data: countryData
                        })


                        map.addLayer({
                                id: "country-fills",
                                type: "fill",
                                source: "country",
                                paint: {
                                        "fill-color": "#00ff00",
                                        "fill-opacity": [
                                                "case",
                                                ["boolean", ["feature-state", "hover"], false],
                                                1,
                                                1
                                        ]
                                }
                        })

                        map.addLayer({
                                id: "provinces-fills",
                                type: "fill",
                                source: "provinces",
                                paint: {
                                        "fill-color": "#ff0000",
                                        "fill-opacity": [
                                                "case",
                                                ["boolean", ["feature-state", "hover"], false],
                                                .5,
                                                0
                                        ]
                                }
                        })
                })

                map.on("mousemove", "provinces-fills", (e) => {
                        console.log(e.features[0])
                        map.getCanvas().style.cursor = 'pointer'
                        if (e.features.length > 0) {
                                if (this.props.hoveredProvinceId >= 0) {
                                        map.setFeatureState({
                                                source: "provinces", id: this.props.hoveredProvinceId
                                        }, { hover: false })
                                }

                                this.props.mousemove(
                                        e.features[0].id,                                               // Identifier of the hovered province  
                                        [e.originalEvent.clientX, e.originalEvent.clientY],             // Position of the mouse cursor
                                        e.features[0].properties.NAME,                                  // Name of the hovered province
                                        e.features[0].properties.PROVINCE                               // Pinyin of the hovered province
                                )
                                map.setFeatureState({ source: "provinces", id: this.props.hoveredProvinceId }, {
                                        hover: true
                                })
                        }
                })

                map.on("mouseleave", "provinces-fills", () => {
                        if (this.props.hoveredProvinceId >= 0) {
                                map.setFeatureState({
                                        source: "provinces", id: this.props.hoveredProvinceId
                                }, { hover: false })
                        }

                        this.props.mousemove(null)

                })

                map.on("click", "provinces-fills", () => {
                        const locationData = this.props.data.locations
                        const data = locationData.find(item => item.province === this.props.hoveredProvincePinyin)

                        map.flyTo({
                                center: [
                                        data.coordinates.longitude,
                                        data.coordinates.latitude
                                ],
                                speed: 0.3,
                                zoom: 4,
                                pitch: 60
                        })

                })

                map.addControl(new mapboxgl.FullscreenControl());
        }

        render() {
                console.log(this.props)
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