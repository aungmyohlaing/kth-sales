import React, { Component } from 'react';
import { Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import Services from './service';

export default class averageReturnByPeriod extends Component {

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
              * Load Total current month Return
              */
             let currentMonthReturn = new Date().getMonth() + 1;
             Services().getMonthlyTotalReturn(currentMonthReturn).then(res => {
                 if (res.length === 0) {
                     this.setState({ currentAverage: 0 });
                 } else this.setState({ currentAverage: res[0].totalreturn });
             });
 
             /**
              * Load Total Last Month Return
              */
 
             let lastMonthReturn = new Date().getMonth();
             Services().getMonthlyTotalReturn(lastMonthReturn).then(res => {
                 if (res.length === 0) {
                     this.setState({ lastAverage: 0 });
                 } else this.setState({ lastAverage: res[0].totalreturn });
             });
 
        }
        else {

            /**
             * Load Total current Year Return
             */
            let currentYearReturn = new Date().getFullYear();
            Services().getYearlyTotalReturn(currentYearReturn).then(res => {

                if (res.length === 0)
                    this.setState({ currentAverage: 0 });
                else this.setState({ currentAverage: res[0].totalreturn });


            });

             /**
            * Load Total last Year Return
            */
          
            let lastYearReturn = new Date().getFullYear() - 1;
            Services().getYearlyTotalReturn(lastYearReturn).then(res => {

                if (res.length === 0) {
                    this.setState({ lastAverage: 0 });
                }
                else this.setState({ lastAverage: res[0].totalreturn });


            });            
           
        }
    }

    render() {
        var self = this;
        const { title, description } = this.props;
        function CompareTotal() {
            if (self.state.currentAverage > self.state.lastAverage) {                
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow-return" /> {self.state.currentAverage} Ks</h2>
            }
            else {                
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow-return" /> {self.state.currentAverage} Ks</h2>
            }
        }
        return (
            <Row>
                <Col sm={12}>
                    <Panel bsStyle={(self.state.currentAverage > self.state.lastAverage)? "danger" : "success"}>
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