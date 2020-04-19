import React from 'react'

class Tooltip extends React.Component {
    constructor(props) {
        this.cardRef = React.createRef()
        super(props)
    }

    componentDidMount() {
        cardRef.current.style.top = props.coordinates[1] - 300 + "px"
        cardRef.current.style.left = props.coordinates[0] + "px"
        cardRef.current.style.transform = "translate(-50%, -50%)"
    }
}

    useEffect(() => {
        
    })

    return (
        <div ref={cardRef} className="Card">
            { props.name }
        </div>
    )
}

export default Card