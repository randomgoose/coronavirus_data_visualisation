import React, { PureComponent } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload, rotate
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text fontSize={10} x={0} y={0} dy={16} textAnchor="end" fill="#666" transform={`rotate(${this.props.rotate})`}>{payload.value}</text>
      </g>
    );
  }
}

export default class Chart extends PureComponent {

  render() {
    let data = []
    if (this.props.data) {
      for (let k in this.props.data) {
        data.push({
          "日期": this.props.data[k].date.split("-")[1] + "-" + this.props.data[k].date.split("-")[2],
          "确诊人数": this.props.data[k].confirmed,
          "死亡人数": this.props.data[k].deaths,
          "治愈人数": this.props.data[k].recovered
        })
      }
    }

    return (
      // <ResponsiveContainer width={700} height="80%">
        <div className={"Chart"}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5, bottom: 5, left: 5, right: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={<CustomizedAxisTick rotate={-45} />} interval={5} tickSize={1} dataKey="日期" label={{value: "日期", position: "insideBottomRight"}}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="确诊人数" stroke="#ed6663" />
            <Line type="monotone" dataKey="死亡人数" stroke="#1b262c" />
            <Line type="monotone" dataKey="治愈人数" stroke="#0f4c81" />
          </LineChart>
        </div>
    );
  }
}
