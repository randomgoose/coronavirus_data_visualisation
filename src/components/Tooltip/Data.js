import React from 'react'

class Data extends React.Component {

    render() {
        return (
            <div className="Data">
                <span className="Data__trend">{ this.props.trend }</span>
                <span className="Data__number">{ this.props.number }</span>
                <span className="Data__title">{ this.props.title }</span>
            </div>
        )
    }
}

export default Data