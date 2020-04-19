import React, { useRef, useState, useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import data from './data/data.json'
import './App.css';
import './sass/main.scss'
import geoData from './data/china-province.geojson'
import Card from './components/Card'
import { Canvas, useThree } from 'react-three-fiber';
import Box from './components/Box'
import * as THREE from 'three'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function App(props) {
  const mapRef = useRef()
  const canvasRef = useRef()
  const coordinatesRef = useRef()
  const [currentProvince, setCurrentProvince] = useState("")
  const [coordinates, setCoordinates] = useState([0, 0])
  // const [hoveredProvinceId, setHoveredProvinceId] = useState(null)
  let hoveredProvinceId = null
  let map
  let canvas

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 2,
      center: [-87.618312, 41.866674],
      pitch: 30,
      antialias: true
    })

    map.on('load', function() {

      map.addSource('provinces', {
        "type": "geojson",
        "data": geoData
      })

      map.addLayer(
        {
          'id': 'provinces-borders',
          'type': 'line',
          'source': 'provinces',
          'paint': {
            'line-color': '#ffe400',
            'line-width': 2
          }
        }
      )

      map.addLayer({
        'id': 'provinces-fills',
        'type': 'fill',
        'source': 'provinces',
        'paint': {
          'fill-color': '#ff0000',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            .5,
            0.1
            ]
        }
      })

      map.on('mousemove', 'provinces-fills', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if(hoveredProvinceId >= 0) {
            map.setFeatureState({ source: 'provinces', id: hoveredProvinceId}, { hover: false })
          }
          hoveredProvinceId = e.features[0].id
          map.setFeatureState({ source: 'provinces', id: hoveredProvinceId }, { hover: true })
        }
      })

      map.on('mouseleave', 'provinces-fills', function() {
        if (hoveredProvinceId >= 0) {
          console.log(hoveredProvinceId)
          map.setFeatureState(
            { source: 'provinces', id: hoveredProvinceId },
            { hover: false }
          )
        }
        hoveredProvinceId = null;
      })

      function rotateCamera(timestamp) {
        // rotate at approximately ~10 degrees per second
        map.setPitch((timestamp / 100) % 360, {duration: 0});
        // request the next frame of the animation
        requestAnimationFrame(rotateCamera);
    }

      map.on('click', (e) => {
        rotateCamera(0);
      })
      
    })
  }, [])


  return (
    <div className="App">
      <canvas id="real" ref={canvasRef}></canvas>
      <Card name={currentProvince} coordinates={coordinates} />
      <pre className="coordinates" ref={coordinatesRef}></pre>
      <div className="absolute top right left bottom" ref={mapRef}></div>
      <Canvas><Box /></Canvas>
      
    </div>
  );


}

export default App;


// gl={{
//   canvas: canvasRef.current,
//   camera: new THREE.PerspectiveCamera({fov: 75, near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]}),
//   scene: new THREE.Scene(),
// }}