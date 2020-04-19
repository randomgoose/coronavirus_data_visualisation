import React, { useState, useRef, useEffect } from 'react'

function Card(props) {
    const cardRef = useRef()

    useEffect(() => {
        cardRef.current.style.top = props.coordinates[1] - 300 + "px"
        cardRef.current.style.left = props.coordinates[0] + "px"
        cardRef.current.style.transform = "translate(-50%, -50%)"
    })

    return (
        <div ref={cardRef} className="Card">
            { props.name }
        </div>
    )
}

export default Card