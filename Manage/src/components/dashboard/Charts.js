import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { month: 'Month 1', revenue: 2.525 },
  { month: 'Month 2', revenue: 3.018 },
  { month: 'Month 3', revenue: 3.682 },
  { month: 'Month 4', revenue: 4.440 },
  { month: 'Month 5', revenue: 5.310 },
  { month: 'Month 6', revenue: 6.127 },
  { month: 'Month 7', revenue: 6.930 },
  { month: 'Month 8', revenue: 6.930 },
  { month: 'Month 9', revenue: 7.930 },
  { month: 'Month 10', revenue: 8.930 },
  { month: 'Month 11', revenue: 5.930 },
  { month: 'Month 12', revenue: 10.930 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }
  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={100} />

          <BarSeries
            valueField="revenue"
            argumentField="month"
          />
          <Title text= {'Revenue ' + new Date().getFullYear()} />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
