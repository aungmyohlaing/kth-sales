import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

export default class ChartControl extends React.Component {
    
    render(){
        const { chartdata, type, height } = this.props;

        function LoadChart(){
            var chartType = type.toString().toLowerCase();
            if(chartType === "bar"){
                return <Bar data={chartdata} height={height} redraw/>
            }
            else if(chartType === "line"){
                return <Line data={chartdata}  redraw/>
            }
            else if(chartType === "pie"){
                return <Pie data={chartdata}  redraw/>
            }
            else if(chartType === "doughnut"){
                return <Doughnut data={chartdata}  redraw/>
            }
        }
        
        return (
           <LoadChart />
        )
    }
}