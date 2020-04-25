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
    yesterdayCountryData = 0

    countryConfirmed = 0
    countryDeaths = 0
    countryRecovered = 0

    diffConfirmed = 0
    diffDeaths = 0
    diffRecovered = 0

    render() {
        if (this.props.hoveredCountryId) {
            const hoveredCountry = this.props.data.find(country => country.country_code === this.props.hoveredCountryCode)
            if (hoveredCountry) {
                this.hoveredCountryTimeline = hoveredCountry.timeline
                this.dailyCountryData = this.hoveredCountryTimeline.find(date => date.date === this.props.date)
                this.yesterdayCountryData = this.hoveredCountryTimeline[this.hoveredCountryTimeline.indexOf(this.dailyCountryData) - 1]
                // console.log(this.yesterdayCountryData)

                if (this.yesterdayCountryData) {
                    this.diffConfirmed = this.dailyCountryData.confirmed - this.yesterdayCountryData.confirmed
                    this.diffRecovered = this.dailyCountryData.recovered - this.yesterdayCountryData.recovered
                    this.diffDeaths = this.dailyCountryData.deaths - this.yesterdayCountryData.deaths
                }
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
                    <Data color={"red"} title="累计确诊人数" trend={this.diffConfirmed >= 0 ? "增加 +" + this.diffConfirmed : "减少 " + Math.abs(this.diffConfirmed)} number={this.dailyCountryData.confirmed ? this.dailyCountryData.confirmed : 0}/>
                    <Data color={"black"} title="累计死亡人数" trend={this.diffDeaths >= 0 ? "增加 +" + this.diffDeaths : "减少 " + Math.abs(this.diffDeaths)} number={this.dailyCountryData.deaths ? this.dailyCountryData.deaths : 0}/>
                    <Data color={"blue"} title="累计治愈人数" trend={this.diffRecovered >= 0 ? "增加 +" + this.diffRecovered : "减少 " + Math.abs(this.diffRecovered)} number={this.dailyCountryData.recovered ? this.dailyCountryData.recovered : 0}/>
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