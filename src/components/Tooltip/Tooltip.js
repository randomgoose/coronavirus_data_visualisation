import React from 'react'
import Data from './Data'
import { connect } from 'react-redux'
import Chart from '../Chart/Chart'

class Tooltip extends React.Component {
    constructor(props) {
        super(props)
        this.tooltipRef = React.createRef()
    }

    hoveredCountryTimeline
    dailyCountryData = 0

    render() {
        if (this.props.hoveredCountryId) {
            const hoveredCountry = this.props.data.find(country => country.country_code === this.props.hoveredCountryCode)
            if (hoveredCountry) {
                this.hoveredCountryTimeline = hoveredCountry.timeline
                this.dailyCountryData = this.hoveredCountryTimeline.find(date => date.date === this.props.date)
            }
        }

        return (
            
            <div ref={this.tooltipRef} className="Tooltip" style={{
                "top": this.props.coordinates ? this.props.coordinates[1] + "px" : 0,
                "left": this.props.coordinates ? this.props.coordinates[0] + "px" : 0,
                "display": this.props.coordinates ? "flex" : "none"
            }}>
                <span className="Tooltip__title">{this.props.hoveredCountryName}</span>

                <Chart data={this.hoveredCountryTimeline ? this.hoveredCountryTimeline : []}/>

                <div className="Tooltip__data-group">
                    <Data title="累计确诊人数" trend="新增 +12" number={this.dailyCountryData.confirmed ? this.dailyCountryData.confirmed : 0}/>
                    <Data title="累计死亡人数" trend="新增 +12" number={this.dailyCountryData.deaths ? this.dailyCountryData.deaths : 0}/>
                    <Data title="累计治愈人数" trend="新增 +12" number={this.dailyCountryData.recovered ? this.dailyCountryData.recovered : 0}/>
                </div>
                {/* <div>{ this.props.data_china.latest.confirmed }</div> */}
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Tooltip)