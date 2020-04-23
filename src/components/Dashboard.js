import React from 'react'
import Data from './Tooltip/Data'
import TimeSlider from './TimeSlider/TimeSlider'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Dashboard">
                <h1>Covid-19 Dashboard</h1>
            
                <TimeSlider />

                <div className="Dashboard__data-group">
                    <Data trend="s" title="累计确诊人数" number={12} />
                    <Data trend="s" title="现存确诊人数" number={12} />
                    <Data trend="s" title="累计死亡人数" number={12} />
                    <Data trend="s" title="累计治愈人数" number={12} />
                </div>
            </div>
        )
    }
}

export default Dashboard