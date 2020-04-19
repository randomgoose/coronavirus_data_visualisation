import React from 'react';
import mapboxgl from 'mapbox-gl';
import geoData from '../data/china-province.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends React.Component {

  constructor(props){
    super(props)
    this.mapRef = React.createRef()

    this.state = {
      currentProvince: "",
      coordinates: [0, 0],
      hoveredProvinceId: null,
      canvas: null
    }
  }
  
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
      map.getCanvas().style.cursor = 'pointer'
      if (e.features.length > 0) {
        if (this.state.hoveredProvinceId >= 0) {
          map.setFeatureState({
            source: "provinces", id: this.state.hoveredProvinceId
          },  { hover: false})
        }
        this.setState({
          hoveredProvinceId: e.features[0].id
        }, () => {
          map.setFeatureState({source: "provinces", id: this.state.hoveredProvinceId}, {
            hover: true
          })
        })
      }
    })

    map.on("mouseleave", "provinces-fills", () => {
      if (this.state.hoveredProvinceId >= 0) {
        map.setFeatureState({
          source: "provinces", id: this.state.hoveredProvinceId
        }, { hover: false})
      }
      this.setState({
        hoveredProvinceId: null
      })
    })
    

    this.setState({
      canvas: map.getCanvas()
    })
  }

  render() {
    return (
      <div className="Map">
        <div className="absolute top right left bottom" ref={this.mapRef}></div>
      </div>
    );
  }
}
  
export default Map;