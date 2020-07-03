import React from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import Services from "../views/home/service";
import { Card } from 'react-bootstrap'

export default class ChartControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartdata: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#FF6384", "#36A2EB", "#26a69a"],
            data: [],
            label: [],
          },
        ],
      },
    };

    this.generateMonthName = this.generateMonthName.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  generateMonthName(val) {
    var month;
    switch (val) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "Jun";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "Augest";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      default:
        month = "December";
    }
    return month;
  }

  renderCharts(){
    var currentYear = new Date().getFullYear();
   
    if (this.props.chartfor.toString().toLowerCase() === "sales") {
       /**
       * Load Current Year Sales Chart Data
       */
      let newChartState = Object.assign({}, this.state.chartdata);
      newChartState.datasets[0].label = "This Year Sales";
      Services()
        .getThisYearChart(currentYear)
        .then((res) => {
          for (var i = 0; i < res.length; i++) {
            newChartState.labels.push([
              this.generateMonthName(res[i]._id.month),
            ]);
            newChartState.datasets[0].data.push(res[i].totalsales);
          }
          this.setState({ chartdata: newChartState });
        });
      } else {

        /**
       * Load Current Year Return Chart Data
       */
      let newReturnChartState = Object.assign({}, this.state.chartdata);
      newReturnChartState.datasets[0].label = "This Year Return";
      Services()
        .getThisYearReturnChart(currentYear)
        .then((res) => {
          for (var i = 0; i < res.length; i++) {
            newReturnChartState.labels.push([
              this.generateMonthName(res[i]._id.month),
            ]);
            newReturnChartState.datasets[0].data.push(res[i].totalreturn);
          }
          this.setState({ chartdata: newReturnChartState });
        });

      }
  }

  componentDidMount() {           
    this.renderCharts();         
  }

  render() {
    var self = this;
    const { type, height, title } = this.props;

    function LoadChart() {
      var chartType = type.toString().toLowerCase();
      if (chartType === "bar") {
        return <Bar data={self.state.chartdata} height={height} redraw />;
      } else if (chartType === "line") {
        return <Line data={self.state.chartdata} redraw />;
      } else if (chartType === "pie") {
        return <Pie data={self.state.chartdata} redraw />;
      } else if (chartType === "doughnut") {
        return <Doughnut data={self.state.chartdata} redraw />;
      }
    }

    // function Validation(){
    //     if (self.state.chartdata.datasets[0].data.length > 0 )
    //     {
    //         return LoadChart();
    //     }
    //     else  return (<div style={{textAlign:'center',fontSize:'30px'}}>No Data</div>);
    // }

    return (
      <div>
        <Card bg="light" text="dark">
          <Card.Header>{title}</Card.Header>
          <Card.Body>
            <LoadChart />
          </Card.Body>
        </Card>
        {/* <div ><h3>{title}</h3></div> */}

        {/* <LoadChart /> */}
        {/* <Validation /> */}
      </div>
    );
  }
}
