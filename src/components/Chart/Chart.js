import React, { PureComponent } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default class Chart extends PureComponent {

  render() {
    let data = []
    if (this.props.data) {
      for (let k in this.props.data) {
        data.push({
          "日期": k,
          "确诊人数": this.props.data[k]
        })
      }
    }

    return (
      // <ResponsiveContainer width={700} height="80%">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5, bottom: 5, left: 5, right: 60
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="确诊人数" stroke="#8884d8" />
        </LineChart>
      // </ResponsiveContainer>
    );
  }
}
