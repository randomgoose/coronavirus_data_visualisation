import React from 'react';
import mapboxgl from 'mapbox-gl';
// import geoDataChina from '../data/china-province.geojson'
import { mousemove, layersFinishLoading, loadLayers, hoverCountry } from '../redux/action-creators'
import { connect } from 'react-redux'
import geoDataChina from "../data/china-province.json"
import geoDataWorld from "../data/countries.json" 
import virusDataWorld from "../data/world_timeline.json"
import ProgressBar from "./ProgressBar";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
let percentage = 0;

const stops = [
        [0, "#333333"],
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
                        const country = geoDataWorld.features.find(feature => feature.properties.ISO_A3 === i.country_code)
                        if (country) {
                                i.timeline.forEach(date => {
                                        country.properties[`${date.date}`] = date.confirmed - date.deaths - date.recovered
                                })
                        }
                })

                virusDataWorld[0].timeline.forEach(date => {
                        this.map.setPaintProperty(date.date, 'fill-opacity', 0)
                        this.setFill(date.date, date.date)
                })

                this.map.setPaintProperty(this.props.date, 'fill-opacity', 1)

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

                        virusDataWorld[0].timeline.forEach(date => {
                                this.map.addLayer({
                                        id: date.date,
                                        type: "fill",
                                        source: "countries",
                                        // visibility: "none",
                                        paint: {
                                                "fill-opacity": date.date === "2020-01-22" ? 1 : 0
                                        }
                                }, 'settlement-label')
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
                                                .1,
                                                0
                                        ]
                                }
                        }, 'settlement-label')


                        this.map.on("mousemove", "countries-fill", (e) => {

                                this.map.getCanvas().style.cursor = 'pointer'
                                if (e.features.length > 0) {
                                        if(this.props.hoveredCountryId >= 0) {
                                                this.map.setFeatureState({
                                                        source: "countries", id: this.props.hoveredCountryId
                                                }, { hover: false})
                                        }
                                        this.props.hoverCountry(e.features[0].id,
                                                                e.features[0].properties.ISO_A3,
                                                                e.features[0].properties.ADMIN,
                                                                [e.originalEvent.clientX, e.originalEvent.clientY])

                                        this.map.setFeatureState({
                                                source: 'countries',
                                                id: this.props.hoveredCountryId
                                        }, { hover: true })
                                }
                        })
                
                        this.map.on("mouseleave", "countries-fill", () => {
                                if (this.props.hoveredCountryId >= 0) {
                                        this.map.setFeatureState({
                                                source: "countries", id: this.props.hoveredCountryId
                                        }, { hover: false })
                                }

                                this.props.hoverCountry(null, null, null)
                        })

                // this.map.on("mousemove", "provinces-fills", (e) => {
                //
                //         this.map.getCanvas().style.cursor = 'pointer'
                //         if (e.features.length > 0) {
                //                 if (this.props.hoveredProvinceId >= 0) {
                //                         this.map.setFeatureState({
                //                                 source: "provinces", id: this.props.hoveredProvinceId
                //                         }, { hover: false })
                //                 }
                //
                //                 this.props.mousemove(
                //                         e.features[0].id,                                               // Identifier of the hovered province
                //                         [e.originalEvent.clientX, e.originalEvent.clientY],             // Position of the mouse cursor
                //                         e.features[0].properties.NAME,                                  // Name of the hovered province
                //                         e.features[0].properties.PROVINCE                               // Pinyin of the hovered province
                //                 )
                //                 this.map.setFeatureState({ source: "provinces", id: this.props.hoveredProvinceId }, {
                //                         hover: true
                //                 })
                //         }
                // })

                // this.map.on("mouseleave", "provinces-fills", () => {
                //         if (this.props.hoveredProvinceId >= 0) {
                //                 this.map.setFeatureState({
                //                         source: "provinces", id: this.props.hoveredProvinceId
                //                 }, { hover: false })
                //         }
                //
                //         this.props.mousemove(null)
                //
                // })
                //
                this.map.addControl(new mapboxgl.FullscreenControl());

                this.map.on("idle", (e) => {
                        this.props.layersFinishLoading()
                })

                this.map.on("click", 'countries-fill', (e) => {
                        console.log(e.lngLat.wrap())
                        this.map.flyTo({
                                center: [e.lngLat.wrap().lng, e.lngLat.wrap().lat],
                                zoom: 9,
                                speed: 0.2,
                                curve: 1,
                                easing(t) {
                                  return t;
                                }
                              });
                })


                // this.map.on("data", () => {
                //         percentage += 1
                //         if(document.getElementsByClassName("ProgressBar__progress")[0] && percentage / 47 * 100 <= 100) {
                //                 console.log(Math.floor(percentage / 47 * 100)  + "%")
                //                 document.getElementsByClassName("ProgressBar__progress")[0].style.width = Math.floor(percentage / 47 * 100)  + "%"
                //         }
                // })
        }
        )}

        setFill(layerId) {
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
        mousemove,
        layersFinishLoading,
        loadLayers,
        hoverCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);