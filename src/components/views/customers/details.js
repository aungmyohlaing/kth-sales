import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Image, Table, Button, Panel } from 'react-bootstrap';
import Header from '../../header';
import Footer from '../../footer';
import userlogo from '../../images/businessman.png';
import Service from './service';
import Moment from 'moment';


export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    salesamount: '',
                    currentamount: '',
                    address1: '',
                    address2: ''
                }
            ],
            collection: [{
                _id: '',
                customerid: '',
                voucherno: '',
                amount: '',
                createdate: '',
                collectiondate: ''
            }],
            newvoucher: [{
                _id: '',
                customerid: '',
                voucherno: '',
                amount: '',
                createdate: '',
                voucherdate: '',
            }],
            returnitem: [{
                _id: '',
                customerid: '',
                voucherno: '',
                amount: '',
                createdate: '',
                returndate: '',
            }]

        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        Service().getById(params.id).then(res => {
            this.setState({ customer: res });
        });

        Service().getDailyCollection(params.id).then(res => {
            this.setState({ collection: res });
        });

        Service().getNewVouchers(params.id).then(res => {
            this.setState({ newvoucher: res });
        });

        Service().getReturnItems(params.id).then(res => {
            this.setState({ returnitem: res });
        });
    }



    render() {
        // function MoreButton(){
        //     if(this.state.collection.lenght >= 7){
        //         return <Button bsStyle="primary" block>More..</Button>
        //     }
        //     else return null;
        // }

        return (
            <div>
                <Header />
                <div id="mainview" className="container">
                    <PageHeader>Customer <small>Detail</small></PageHeader>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={12} md={3} lg={3} className="cusdetail">
                                <Row style={{ margin: '10px' }} >
                                    <Col sm={12} md={12} lg={12} className="text-center">
                                        <Image src={userlogo} alt="Image" width={200} height={200} circle thumbnail />
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12} className="cusdetailcol">
                                        <strong>Name: </strong>
                                        {this.state.customer.name}
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12}>
                                        <strong>Email: </strong>
                                        {this.state.customer.email}
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12}>
                                        <strong>Mobile: </strong>
                                        {this.state.customer.mobile}
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12}>
                                        <strong>Phone: </strong>
                                        {this.state.customer.phone}
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12}>
                                        <strong>Address: </strong>
                                        {this.state.customer.address1}
                                    </Col>
                                </Row>
                                <Row className="cusdetailrow">
                                    <Col sm={12} md={12} lg={12}>
                                        <strong>Address: </strong>
                                        {this.state.customer.address2}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9}>

                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                        <Panel bsStyle="primary">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Sales Amount</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body className="text-center"><h1><span>{this.state.customer.salesamount}K</span></h1></Panel.Body>
                                        </Panel>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <Panel bsStyle="success">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Paid Amount</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body className="text-center"><h1><span>{this.state.customer.salesamount - this.state.customer.currentamount}K</span></h1></Panel.Body>
                                        </Panel>
                                    </Col>
                                    <Col sm={12} md={4} lg={4}>
                                        <Panel bsStyle="info">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Remaining Amount</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body className="text-center"><h1><span>{this.state.customer.currentamount}K</span></h1></Panel.Body>
                                        </Panel>
                                    </Col>

                                </Row>
                                <Row className={this.state.customer.salesamount > 0 ? 'hidden' : ''}>
                                    <Col sm={12} md={12} lg={12} className="text-center" >
                                        <div>
                                            <h1> There is no records yet. </h1>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={this.state.collection.length < 1 ? 'hidden': ''}>
                                    <Col sm={12} md={12} lg={12} >
                                        <Panel bsStyle="default">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h4">Daily Collection</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                <Table striped responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Voucher No.</th>
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.collection.map(function (item) {
                                                                return (
                                                                    <tr key={item._id}>
                                                                        <td>{item.voucherno === '' ? '-' : item.voucherno}</td>
                                                                        <td>{item.amount}</td>
                                                                        <td>{Moment(item.collectiondate).format('MMM DD, YYYY')}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                                {/* <MoreButton/>*/}
                                                {
                                                    (this.state.collection.length >= 10) ? <Button bsStyle="primary" block>More...</Button> : null
                                                }
                                            </Panel.Body>
                                        </Panel>

                                    </Col>
                                </Row>
                                <Row className={this.state.newvoucher.length < 1 ? 'hidden': ''}>
                                    <Col sm={12} md={12} lg={12}>
                                        <Panel bsStyle="default">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h4">Sales</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                <Table striped responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Voucher No.</th>
                                                            <th>Item No.</th>
                                                            <th>Quantity</th>
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.newvoucher.map(function (item) {
                                                                return (
                                                                    <tr key={item._id}>
                                                                        <td>{item.voucherno}</td>
                                                                        <td>{item.itemno}</td>
                                                                        <td>{item.quantity}</td>
                                                                        <td>{item.amount}</td>
                                                                        <td>{Moment(item.voucherdate).format('MMM DD, YYYY')}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                                {/* <MoreButton/>*/}
                                                {
                                                    (this.state.newvoucher.length >= 10) ? <Button bsStyle="primary" block>More..</Button> : null


                                                }
                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                                <Row className={this.state.returnitem.length < 1 ? 'hidden': ''}>
                                    <Col sm={12} md={12} lg={12}>
                                        <Panel bsStyle="default">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">Return</Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body className="text-center">
                                                <Table striped responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Voucher No.</th>
                                                            <th>Item No.</th>
                                                            <th>Quantity</th>
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.returnitem.map(function (item) {
                                                                return (
                                                                    <tr key={item._id}>
                                                                        <td>{item.voucherno}</td>
                                                                        <td>{item.itemno}</td>
                                                                        <td>{item.quantity}</td>
                                                                        <td>{item.amount}</td>
                                                                        <td>{Moment(item.returndate).format('MMM DD, YYYY')}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                                {/* <MoreButton/>*/}
                                                {
                                                    (this.state.returnitem.length >= 10) ? <Button bsStyle="primary" block>More..</Button> : null


                                                }                                                
                                            </Panel.Body>
                                        </Panel>                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Grid>
                </div>
                <Footer />
            </div>
        )
    }
}