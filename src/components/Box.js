import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useThree, createPortal } from 'react-three-fiber'
import { Scene } from 'three'
import * as THREE from 'three'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const virtualScene = useMemo(() => new Scene(), [])
  const [canvas, setCanvas] = useState(props.canvas)
  
  let {
    gl,                           // WebGL renderer
    scene,                        // Default scene
    camera,                       // Default camera
    size,                         // Bounds of the view (which stretches 100% and auto-adjusts)
    viewport,                     // Bounds of the viewport in 3d units + factor (size/viewport)
    aspect,                       // Aspect ratio (size.width / size.height)
    mouse,                        // Current 2D mouse coordinates
    clock,                        // THREE.Clock (useful for useFrame deltas)
    invalidate,                   // Invalidates a single frame (for <Canvas invalidateFrameloop />)
    intersect,                    // Calls onMouseMove handlers for objects underneath the cursor
    setDefaultCamera,             // Sets the default camera
  } = useThree()

  const virtualCam = camera

  // if (props.canvas != null){
  //   gl = new THREE.WebGLRenderer({
  //     canvas
  //   })
  // }
  
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    gl.render(virtualScene, virtualCam)
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  }, 2)
  
  return createPortal(
      <>
        <mesh
        {...props}
        ref={mesh}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        >
          <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
          <meshStandardMaterial attach="material" color={'orange'} />
        </mesh>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </>,
    virtualScene
    )

  // return ( 
  //   <>
  //   <mesh
  //     {...props}
  //     ref={mesh}
  //     scale={[1, 1, 1]}>
  //       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //       <meshStandardMaterial attach="material" color={'orange'} />
  //     </mesh>
  //   </> 
  //   )
}

export default Box