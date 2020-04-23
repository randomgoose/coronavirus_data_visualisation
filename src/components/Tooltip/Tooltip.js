import React from 'react'
import Data from './Data'
import { connect } from 'react-redux'
import Chart from '../Chart/Chart'

class Tooltip extends React.Component {
    constructor(props) {
        super(props)
        this.tooltipRef = React.createRef()
    }

    render() {
        let data

        if(this.props.hoveredProvincePinyin) {
            const locationData = typeof this.props.data_china.locations === 'object' && this.props.data_china.locations.length > 0 ? this.props.data_china.locations : []
            data = locationData.find(item => item.province === this.props.hoveredProvincePinyin)
            console.log(data.timelines.confirmed.timeline)
        }


        return (
            
            <div ref={this.tooltipRef} className="Tooltip" style={{
                "top": this.props.coordinates ? this.props.coordinates[1] + "px" : 0,
                "left": this.props.coordinates ? this.props.coordinates[0] + "px" : 0,
                "display": this.props.coordinates ? "flex" : "none"
            }}>
                <span className="Tooltip__title">{this.props.hoveredProvinceName}</span>

                <Chart data={data ? data.timelines.confirmed.timeline : []}/>

                <div className="Tooltip__data-group">
                    <Data title="累计确诊人数" trend="新增 +12" number={data ? data.latest.confirmed : "暂无数据"}/>
                    <Data title="累计死亡人数" trend="新增 +12" number={data ? data.latest.deaths : "暂无数据"}/>
                    <Data title="累计治愈人数" trend="新增 +12" number={data ? data.latest.recovered : "暂无数据"}/>
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