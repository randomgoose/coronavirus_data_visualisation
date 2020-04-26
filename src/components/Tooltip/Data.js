import React from 'react'

class Data extends React.Component {

    render() {
        return (
            <div className={`Data ${this.props.color}`}>
                <span className="Data__trend">{ this.props.trend.toLocaleString() }</span>
                <span className="Data__number">{ this.props.number.toLocaleString() }</span>
                <span className="Data__title">{ this.props.title }</span>
            </div>
        )
    }
}

export default Data