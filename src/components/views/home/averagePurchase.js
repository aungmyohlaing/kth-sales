import React, { Component } from 'react';
import { Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import Services from './service';

export default class averageByPeriod extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentAverage:'',
            lastAverage: ''           
        }
    }

    componentDidMount(){
        var self = this;       
        if ( self.props.averageby.toString().toLowerCase() === "month")
        {            
            /**
             * Load Total current month Sales
             */
            let currentMonth = new Date().getMonth() + 1;           
            Services().getMonthlyTotalSales(currentMonth).then(res => {                        
                if (res.length === 0)
                    this.setState({ currentAverage: 0 });
                else this.setState({ currentAverage: res[0].totalsales });
            });

            /**
             * Load Total Last month Sales
             */
            let lastMonth = new Date().getMonth();
            Services().getMonthlyTotalSales(lastMonth).then(res => {
                if (res.length === 0)
                    this.setState({ lastAverage: 0 });
                else this.setState({ lastAverage: res[0].totalsales });
            })
        }
        else {

             /**
             * Load Total current Year Sales
             */
            let currentYear = new Date().getFullYear();
            Services().getYearlyTotalSales(currentYear).then(res => {
                if (res.length === 0)
                    this.setState({ currentAverage: 0 });
                else this.setState({ currentAverage: res[0].totalsales });
            });
            
            /**
             * Load Total last Year Sales
             */
            let lastYear = new Date().getFullYear() - 1;
            Services().getYearlyTotalSales(lastYear).then(res => {

                if (res.length === 0) {
                    this.setState({ lastAverage: 0 });
                }
                else this.setState({ lastAverage: res });

            });
           
        }
    }

    render() {
        var self = this;
        const { title, description } = this.props;
        function CompareTotal() {
            if (self.state.currentAverage > self.state.lastAverage) {                
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow" /> {self.state.currentAverage} Ks</h2>
            }
            else {                
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow" /> {self.state.currentAverage} Ks</h2>
            }
        }
        return (
            <Row>
                <Col sm={12}>
                    <Panel bsStyle={(self.state.currentAverage > self.state.lastAverage)? "success" : "danger"}>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">{title}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <CompareTotal />
                            <p>{description} {self.state.lastAverage} Ks</p>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        )
    }
}