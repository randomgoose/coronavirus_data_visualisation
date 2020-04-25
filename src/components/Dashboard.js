import React from 'react'
import Data from './Tooltip/Data'
import globalData from '../data/global_timeline.json'
import TimeSlider from './TimeSlider/TimeSlider'
import Chart from "./Chart/Chart";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVirus, faChartLine} from '@fortawesome/free-solid-svg-icons'

class Dashboard extends React.Component {
    state = {
        on: true
    }

    dailyGlobalData = null
    globalConfirmed = 0
    globalDeaths = 0
    globalRecovered = 0
    globalConfirmedLeft = 0

    diffConfirmed = 0
    diffDeaths = 0
    diffRecovered = 0
    diffConfirmedLeft = 0

    deathRate = "0"
    recoveredRate = "0"

    diffDeathRate = "0"
    diffRecoveredRate = "0"

    componentDidMount() {
    }

    render() {
        this.dailyGlobalData = globalData.timeline.find(date => date.date === this.props.date)
        this.diffConfirmed = this.dailyGlobalData.confirmed - this.globalConfirmed
        this.diffRecovered = this.dailyGlobalData.recovered - this.globalRecovered
        this.diffDeaths = this.dailyGlobalData.deaths - this.globalDeaths
        this.diffDeathRate = (((this.dailyGlobalData.deaths / this.dailyGlobalData.confirmed) * 100).toFixed(2)  - this.deathRate.split("%")[0]).toFixed(2) + "%"
        this.diffRecoveredRate = (((this.dailyGlobalData.recovered / this.dailyGlobalData.confirmed) * 100).toFixed(2)  - this.recoveredRate.split("%")[0]).toFixed(2) + "%"
        this.diffConfirmedLeft = (this.dailyGlobalData.confirmed - this.dailyGlobalData.deaths - this.dailyGlobalData.recovered) - this.globalConfirmedLeft

        this.globalConfirmed = this.dailyGlobalData.confirmed
        this.globalDeaths = this.dailyGlobalData.deaths
        this.globalRecovered = this.dailyGlobalData.recovered
        this.globalConfirmedLeft = this.dailyGlobalData.confirmed - this.dailyGlobalData.deaths - this.dailyGlobalData.recovered
        this.deathRate = ((this.globalDeaths / this.globalConfirmed) * 100).toFixed(2) + "%"
        this.recoveredRate = ((this.globalRecovered / this.globalConfirmed) * 100).toFixed(2) + "%"

        return (
            <div className={`Dashboard ${this.state.on ? "on" : "off"}`}>
                <button onClick={ () => this.setState({ on: !this.state.on }) }>Toggle</button>
                {this.state.on ? (
                    <>
                        <div className="Dashboard__section">
                            <div className="Dashboard__logo">
                                <FontAwesomeIcon icon={faChartLine} size="lg"/>
                            </div>
                            <h1 className="Dashboard__title">2019年新型冠状病毒疫情地图</h1>
                        </div>

                        <div className="Dashboard__section">
                            <div className="Dashboard__subtitle">时间轴<span>(拖动时间轴查看历史数据)</span></div>
                            <TimeSlider/>
                        </div>

                        <div className="Dashboard__section grey">
                            <div className="Dashboard__subtitle">世界数据</div>
                            <div className="Dashboard__data-group">
                                <Data trend={this.diffConfirmed >= 0 ? "增加 +" + this.diffConfirmed : "减少 " + Math.abs(this.diffConfirmed)} title="累计确诊人数" number={this.dailyGlobalData.confirmed} color="red"/>
                                <Data trend={this.diffConfirmedLeft >= 0 ? "增加 +" + this.diffConfirmedLeft : "减少 " + Math.abs(this.diffConfirmedLeft)} title="现存确诊人数" number={this.globalConfirmed - this.globalDeaths - this.globalRecovered} color="orange"/>
                                <Data trend={this.diffDeaths >= 0 ? "增加 +" + this.diffDeaths : "减少 " + Math.abs(this.diffDeaths)} title="累计死亡人数" number={this.dailyGlobalData.deaths} color="black"/>
                                <Data trend={this.diffDeathRate[0] === "-" ? "减少 " + this.diffDeathRate.split("-")[1] : "增加 +" + this.diffDeathRate} title="死亡率" number={this.deathRate} color="blue"/>
                                <Data trend={this.diffRecoveredRate[0] === "-" ? "减少 " + this.diffRecoveredRate.split("-")[1] : "增加 +" + this.diffRecoveredRate} title="治愈率" number={this.recoveredRate} color="black"/>
                                <Data trend={this.diffRecovered >= 0 ? "增加 +" + this.diffRecovered : "减少 " + Math.abs(this.diffRecovered)} title="累计治愈人数" number={this.dailyGlobalData.recovered} color="blue"/>
                            </div>
                        </div>

                        <div className="Dashboard__section">
                            <div className="Dashboard__subtitle">疫情趋势</div>
                            <Chart data={globalData.timeline}/>
                        </div>
                    </>
                ) : <FontAwesomeIcon icon={faChartLine} size="lg"/>}
            </div>
        )
    }
}

export default Dashboard