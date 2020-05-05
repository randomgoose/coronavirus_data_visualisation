import React from 'react'

class Item extends React.Component {

    render() {
        return (
            <button className={`Item ${this.props.focused ? 'on' : 'off'}`} onClick={() => this.props.handler(this.props.name)}>
                { this.props.children }
            </button>
        )
    }

}

export default Item