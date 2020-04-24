import React from 'react'
import Data from './Tooltip/Data'
import TimeSlider from './TimeSlider/TimeSlider'
import Chart from "./Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus } from '@fortawesome/free-solid-svg-icons'

class Dashboard extends React.Component {
    state = {
        on: false
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="Dashboard__section">
                    <div className="Dashboard__Logo">
                        <FontAwesomeIcon icon={faVirus} size="lg"/>
                    </div>
                    <h1 className="Dashboard__title">Covid-19 Dashboard</h1>
                </div>
                
                <div className="Dashboard__section">
                    <div className="Dashboard__subtitle">时间轴</div>

                    <TimeSlider />
                </div>

                <div className="Dashboard__section">
                    <div className="Dashboard__subtitle">世界数据</div>
                    <div className="Dashboard__data-group">
                        <Data trend="s" title="累计确诊人数" number={12} color="red" />
                        <Data trend="s" title="现存确诊人数" number={12} color="orange" />
                        <Data trend="s" title="累计死亡人数" number={12} color="black" />
                        <Data trend="s" title="累计治愈人数" number={12} color="blue" />
                    </div>
                </div>

                <div className="Dashboard__section">
                    <div className="Dashboard__subtitle">疫情趋势</div>
                    <Chart />
                </div>
            </div>
        )
    }
}

export default Dashboard