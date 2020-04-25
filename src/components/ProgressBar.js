import React from 'react'
import { connect } from 'react-redux'

class ProgressBar extends React.Component {
    progressRef = React.createRef()

    componentDidUpdate() {
        console.log(this.props.progress)
    }

    render() {

        return (
            <div className={"ProgressBar"}>
                <div className={"ProgressBar__track"}>
                     <div ref={this.progressRef} className={"ProgressBar__progress"}></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ProgressBar)