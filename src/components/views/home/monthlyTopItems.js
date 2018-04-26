import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Services from '../home/service';

export default class monthlyTopItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topItems: {
                itemno: [],
                itemname: []
            }
        }
    }

    componentDidMount() {
        var self = this;
        var currentMonth = new Date().getMonth() + 1;
        console.log('MOnthly Type', self.props.type);
        if (self.props.type.toString().toLowerCase() === "selling") {
            /**
             * Load Top Selling Items
             */

            let newTopSellingState = Object.assign({}, self.state.topItems);
            Services().getMonthlyTopSelling(currentMonth).then(res => {
                // this.setState({ currentMonthTotalSales: res[0].totalsales });
                for (var k = 0; k < res.length; k++) {
                    newTopSellingState.itemno.push(res[k]._id.itemno);
                    newTopSellingState.itemname.push(res[k]._id.itemname);

                }
                self.setState({ topItems: newTopSellingState });
            });
        }
        else {
            /**
             * Load Most Return Items
             */
            let newMostReturnState = Object.assign({}, self.state.topItems);
            Services().getMonthlyMostReturnItems(currentMonth).then(res => {

                // this.setState({ currentMonthTotalSales: res[0].totalsales });
                for (var k = 0; k < res.length; k++) {
                    newMostReturnState.itemno.push(res[k]._id.itemno);
                    newMostReturnState.itemname.push(res[k]._id.itemname);

                }
                self.setState({ topItems: newMostReturnState });
            });
        }

    }

    render() {
        const { title } = this.props;
        return (
            <Row>
                <Col sm={12}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">{title}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>

                            {
                                this.state.topItems.itemname.map(function (item, index) {

                                    return (
                                        <div key={index}>{index + 1}. {item}</div>
                                    )
                                })
                            }
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        )
    }
}