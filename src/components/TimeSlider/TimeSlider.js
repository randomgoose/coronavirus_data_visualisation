import React from 'react'
import { connect } from 'react-redux'
import { changeDate } from '../../redux/action-creators'

class TimeSlider extends React.Component {

        state = {
                value: 0
        }

        componentDidUpdate(prevProps, prevState){
        }

        render() {
                const timeDifference = Math.floor((new Date().getTime() - new Date("2020-01-22").getTime()) / (1000 * 3600 * 24)) // Calculate the difference between today and 2020-01-22
                let timeline = []
                for(let i=0;i<=timeDifference;i++) {
                        let day = new Date(new Date("2020-01-22").getTime() + i*86400*1000).toLocaleString().split(",")[0].split("/").reverse().join("-")
                        timeline.push(day)
                }

                return (
                        <div className="TimeSlider">
                            <span className="TimeSlider__date-display">{this.props.date}</span>
                            <input type="range"
                                   step={1}
                                   name="date-range"
                                   max={timeDifference}
                                   value={this.state.value}
                                   onChange={e => { this.setState({value: e.target.value}, () => {
                                           this.props.changeDate(timeline[this.state.value])
                                   }) }}
                                   className="TimeSlider__date-range" />
                        </div>
                )
        }

}

function mapStateToProps(state) {
        return state
}

const mapDispatchToProps = {
        changeDate
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSlider)