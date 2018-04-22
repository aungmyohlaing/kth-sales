import React, { Component } from 'react';
import { Row, Col, Thumbnail, Panel, Glyphicon } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import Header from '../../header';
import Footer from '../../footer';
import Storage from '../../../components/commons/localStogare';
import userlogo from '../../images/user-placeholder.jpg';
import Services from './service';
import Charts from '../../charts/chart';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topten: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    currentamount: '',
                    salesamount: '',
                    address1: '',
                    address2: ''
                }
            ],
            chartdata: {
                labels: [],
                datasets: [
                    {
                        backgroundColor:
                            ["#FF6384",
                                "#36A2EB",
                                "#26a69a"
                            ],
                        data: [],
                        label: [],

                    }]
            },
            currentMonthTotalSales: '',
            lastMonthTotalSales: '',
            currentYearTotalSales: '',
            lastYearTotalSales: '',
            topSellingItems: {
                itemno: [],
                itemname: []
            },
            currentMonthTotalReturn: '',
            lastMonthTotalReturn: '',
            currentYearTotalReturn: '',
            lastYearTotalReturn: '',
            returnchartdata: {
                labels: [],
                datasets: [
                    {
                        backgroundColor:
                            ["#FF6384",
                                "#36A2EB",
                                "#26a69a"
                            ],
                        data: [],
                        label: [],

                    }]
            },
            mostReturnItems: {
                itemno: [],
                itemname: []
            }
        }

        this.generateMonthName = this.generateMonthName.bind(this);
    }

    /** 
     * Checke User already login or not?
    */
    componentDidMount() {
        var loggedIn = Storage(localStorage).get('loggedIn');
        var self = this;
        if (!loggedIn) {
            self.props.history.push('/login');
        }
        else {

            Services().getTopTen().then(res => {
                self.setState({ topten: res });
            });

            /**
             * Load Total current month Sales
             */
            let currentMonth = new Date().getMonth() + 1;           
            Services().getMonthlyTotalSales(currentMonth).then(res => {                        
                if (res.length === 0)
                    this.setState({ currentMonthTotalSales: 0 });
                else this.setState({ currentMonthTotalSales: res[0].totalsales });
            });

            /**
             * Load Total Last month Sales
             */
            let lastMonth = new Date().getMonth();
            Services().getMonthlyTotalSales(lastMonth).then(res => {
                if (res.length === 0)
                    this.setState({ lastMonthTotalSales: 0 });
                else this.setState({ lastMonthTotalSales: res[0].totalsales });
            })

            /**
             * Load Total last Year Sales
             */
            let lastYear = new Date().getFullYear() - 1;
            Services().getYearlyTotalSales(lastYear).then(res => {

                if (res.length === 0) {
                    this.setState({ lastYearTotalSales: 0 });
                }
                else this.setState({ lastYearTotalSales: res });

            });

            /**
             * Load Total current Year Sales
             */
            let currentYear = new Date().getFullYear();
            Services().getYearlyTotalSales(currentYear).then(res => {
                if (res.length === 0)
                    this.setState({ currentYearTotalSales: 0 });
                else this.setState({ currentYearTotalSales: res[0].totalsales });
            });

            /**
             * Load Current Year Sales Chart Data
             */
            let newChartState = Object.assign({}, self.state.chartdata);
            newChartState.datasets[0].label = "This Year Sales";
            Services().getThisYearChart(currentYear).then(res => {
                for (var i = 0; i < res.length; i++) {
                    newChartState.labels.push([self.generateMonthName(res[i]._id.month)]);
                    newChartState.datasets[0].data.push(res[i].totalsales);
                }
                self.setState({ chartdata: newChartState });
            });

            /**
             * Load Top Selling Items
             */
            let newTopSellingState = Object.assign({}, self.state.topSellingItems);
            Services().getMonthlyTopSelling(currentMonth).then(res => {

                // this.setState({ currentMonthTotalSales: res[0].totalsales });
                for (var k = 0; k < res.length; k++) {
                    newTopSellingState.itemno.push(res[k]._id.itemno);
                    newTopSellingState.itemname.push(res[k]._id.itemname);

                }
                self.setState({ topSellingItems: newTopSellingState });
            });

            /**
              * Load Total current month Return
              */
            let currentMonthReturn = new Date().getMonth() + 1;
            Services().getMonthlyTotalReturn(currentMonthReturn).then(res => {
                if (res.length === 0) {
                    this.setState({ currentMonthTotalReturn: 0 });
                } else this.setState({ currentMonthTotalReturn: res[0].totalreturn });
            });

            /**
             * Load Total Last Month Return
             */

            let lastMonthReturn = new Date().getMonth();
            Services().getMonthlyTotalReturn(lastMonthReturn).then(res => {
                if (res.length === 0) {
                    this.setState({ lastMonthTotalReturn: 0 });
                } else this.setState({ lastMonthTotalReturn: res[0].totalreturn });
            });


            /**
            * Load Total last Year Return
            */
            let lastYearReturn = new Date().getFullYear() - 1;
            Services().getYearlyTotalReturn(lastYearReturn).then(res => {

                if (res.length === 0) {
                    this.setState({ lastYearTotalReturn: 0 });
                }
                else this.setState({ lastYearTotalReturn: res[0].totalreturn });


            });

            /**
             * Load Total current Year Return
             */
            let currentYearReturn = new Date().getFullYear();
            Services().getYearlyTotalReturn(currentYearReturn).then(res => {

                if (res.length === 0)
                    this.setState({ currentYearTotalReturn: 0 });
                else this.setState({ currentYearTotalReturn: res[0].totalreturn });


            });

            /**
            * Load Current Year Return Chart Data
            */
            let newReturnChartState = Object.assign({}, self.state.returnchartdata);
            newReturnChartState.datasets[0].label = "This Year Return";
            Services().getThisYearReturnChart(currentYear).then(res => {
                
                for (var i = 0; i < res.length; i++) {
                    newReturnChartState.labels.push([self.generateMonthName(res[i]._id.month)]);
                    newReturnChartState.datasets[0].data.push(res[i].totalreturn);
                }
                self.setState({ returnchartdata: newReturnChartState });
            });

            /**
             * Load Most Return Items
             */
            let newMostReturnState = Object.assign({}, self.state.mostReturnItems);
            Services().getMonthlyMostReturnItems(currentMonth).then(res => {

                // this.setState({ currentMonthTotalSales: res[0].totalsales });
                for (var k = 0; k < res.length; k++) {
                    newMostReturnState.itemno.push(res[k]._id.itemno);
                    newMostReturnState.itemname.push(res[k]._id.itemname);

                }
                self.setState({ mostReturnItems: newMostReturnState });
            });

        }
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

    render() {
        var self = this;
        function Comparetotalmonthly() {
            if (self.state.currentMonthTotalSales > self.state.lastMonthTotalSales) {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow" /> {self.state.currentMonthTotalSales} Ks</h2>
            }
            else {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow" /> {self.state.currentMonthTotalSales} Ks</h2>
            }
        }
        function Comparetotalyearly() {
            if (self.state.currentYearTotalSales > self.state.lastYearTotalSales) {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow" /> {self.state.currentYearTotalSales} Ks</h2>
            }
            else {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow" /> {self.state.currentYearTotalSales} Ks</h2>
            }
        }
        function Comparemonthlyreturn() {
            if (self.state.currentMonthTotalReturn > self.state.lastMonthTotalReturn) {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow-return" /> {self.state.currentMonthTotalReturn} Ks</h2>
            }
            else {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow-return" /> {self.state.currentMonthTotalReturn} Ks</h2>
            }
        }

        function Compareyearlyreturn() {
            if (self.state.currentYearTotalReturn > self.state.lastYearTotalReturn) {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-top" className="top-arrow-return" /> {self.state.currentYearTotalReturn} Ks</h2>
            }
            else {
                return <h2><Glyphicon glyph="glyphicon glyphicon-triangle-bottom" className="bottom-arrow-return" /> {self.state.currentYearTotalReturn} Ks</h2>
            }
        }

        return (
            <div>
                <Header />
                <div id="mainview" >
                    <div className="container">
                        <h2>Sales Board</h2>
                        <hr />
                        <Row>
                            <Col sm={12} md={3} lg={3}>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="warning">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Average Purchase By Month</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                <Comparetotalmonthly />
                                                <p>Compare to last month {this.state.lastMonthTotalSales} Ks</p>


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="success">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Average Purchase By Year</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                <Comparetotalyearly />
                                                <p>Compare to last year {this.state.lastYearTotalSales} Ks</p>


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="primary">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">This Month Top Selling Items</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                {
                                                    this.state.topSellingItems.itemname.map(function (item, index) {

                                                        return (
                                                            <div key={index}>{index + 1}. {item}</div>
                                                        )
                                                    })
                                                }


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>

                            </Col>
                            <Col sm={12} md={9} lg={9}>
                                <Panel >
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">This Year Sales</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <Charts chartdata={this.state.chartdata} type="bar" height={167} />
                                    </Panel.Body>
                                </Panel>

                            </Col>
                        </Row>
                        <hr />
                        <h2>Return Board</h2>
                        <hr />
                        <Row>
                            <Col sm={12} md={3} lg={3}>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="warning">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Average Return By Month</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                <Comparemonthlyreturn />
                                                <p>Compare to last month {this.state.lastMonthTotalReturn} Ks</p>


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="success">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Average Return By Year</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                <Compareyearlyreturn />
                                                <p>Compare to last year {this.state.lastYearTotalReturn} Ks</p>


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Panel bsStyle="primary">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">This Month Most Return Items</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>

                                                {
                                                    this.state.mostReturnItems.itemname.map(function (item, index) {

                                                        return (
                                                            <div key={index}>{index + 1}. {item}</div>
                                                        )
                                                    })
                                                }


                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                            </Col>

                            <Col sm={12} md={9} lg={9}>
                                <Panel >
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">This Year Return</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <Charts chartdata={this.state.returnchartdata} type="doughnut" />
                                    </Panel.Body>
                                </Panel>

                            </Col>
                        </Row>
                        <hr />
                        <h2>Top Ten Customers</h2>
                        <hr />
                        <Row>
                            {
                                this.state.topten.map(function (item) {
                                    return (
                                        <Col key={item._id} sm={12} md={2} lg={2}>
                                            <NavLink to={'/customer/detail/' + item._id}>
                                                <Thumbnail src={userlogo} className="cusmedia" alt="242x200">
                                                    <h4>{item.name}</h4>
                                                    <p>Sales Amount: {item.salesamount}</p>
                                                    <p>Current Amount: {item.currentamount}</p>
                                                </Thumbnail>
                                            </NavLink>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}