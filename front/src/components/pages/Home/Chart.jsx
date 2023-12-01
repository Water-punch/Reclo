import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

import global_tem from "../../../data/global_tem";

const data = global_tem;

class Chart extends PureComponent {
  render() {
    return (
      <BarChart
        width={1500}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="land" stackId="a" fill="#8884d8" />
        <Bar dataKey="ocean" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}

export default Chart;
