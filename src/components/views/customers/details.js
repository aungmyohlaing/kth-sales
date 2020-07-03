import React, { Component } from "react";
import {
  Row,
  Col,
  Image,
  Table,
  Button,
  Dropdown,
  Card,
} from "react-bootstrap";
import Header from "../../header";
import Footer from "../../footer";
import userlogo from "../../images/businessman.png";
import Service from "./service";
import Moment from "moment";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: [
        {
          _id: "",
          name: "",
          email: "",
          mobile: "",
          phone: "",
          salesamount: "",
          currentamount: "",
          address1: "",
          address2: "",
        },
      ],
      collection: [
        {
          _id: "",
          customerid: "",
          voucherno: "",
          amount: "",
          createdate: "",
          collectiondate: "",
        },
      ],
      newvoucher: [
        {
          _id: "",
          customerid: "",
          voucherno: "",
          amount: "",
          createdate: "",
          voucherdate: "",
        },
      ],
      returnitem: [
        {
          _id: "",
          customerid: "",
          voucherno: "",
          amount: "",
          createdate: "",
          returndate: "",
        },
      ],
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    Service()
      .getById(params.id)
      .then((res) => {
        this.setState({ customer: res });
      });

    Service()
      .getDailyCollection(params.id)
      .then((res) => {
        this.setState({ collection: res });
      });

    Service()
      .getNewVouchers(params.id)
      .then((res) => {
        this.setState({ newvoucher: res });
      });

    Service()
      .getReturnItems(params.id)
      .then((res) => {
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
          <h2>
            Customer <small>Detail</small>
          </h2>
          <hr />
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Card bg="dark" text="light" style={{ fontSize: '12px' }}>
                <Card.Img className="text-center"
                  variant="top"
                  src={userlogo}    
                  style={{ width: '200px', height: '200px', marginTop:'10px', marginRight: 'auto', marginLeft: 'auto' }}                                          
                />
                <Card.Body style={{ padding: '5px !important' }}>
                  <Card.Text>
                    <strong>Name: </strong>
                    {this.state.customer.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email: </strong>
                    {this.state.customer.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Mobile: </strong>
                    {this.state.customer.mobile}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone: </strong>
                    {this.state.customer.phone}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address 1: </strong>
                    {this.state.customer.address1}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address: </strong>
                    {this.state.customer.address2}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* <div className="cusdetail">
                <Row style={{ margin: "10px" }}>
                  <Col sm={12} md={12} lg={12} className="text-center">
                    <Image
                      src={userlogo}
                      alt="Image"
                      width={200}
                      height={200}
                      roundedCircle
                      thumbnail
                    />
                    <a
                      style={{
                        position: "absolute",
                        right: "-15px",
                        fontSize: "8px",
                      }}
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-ellipsis-v fa-2x waves-effect"></i>
                    </a>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
              </div> */}
            </Col>
            <Col xs={12} sm={12} md={9} lg={9}>
              <Row style={{ marginBottom: "20px" }}>
                <Col sm={12} md={4} lg={4}>
                  <Card bg="info" text="light" className="text-center" >
                    <Card.Header as="h4">Sales Amount</Card.Header>
                    <Card.Body>
                      <Card.Text as="h5">
                        {this.state.customer.salesamount} MMK
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} md={4} lg={4}>
                  <Card bg="info" text="light" className="text-center">
                    <Card.Header as="h4">Paid Amount</Card.Header>
                    <Card.Body>
                      <Card.Text as="h5">
                        {this.state.customer.salesamount - this.state.customer.currentamount} MMK
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} md={4} lg={4}>
                  <Card bg="info" text="light" className="text-center">
                    <Card.Header as="h4">Remaining Amount</Card.Header>
                    <Card.Body>
                      <Card.Text as="h5">
                        {this.state.customer.currentamount} MMK
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row
                className={this.state.customer.salesamount > 0 ? "hidden" : ""}
                style={{ marginBottom: "20px" }}
              >
                <Col sm={12} md={12} lg={12} className="text-center">
                  <div>
                    <h2> No Data. </h2>
                  </div>
                </Col>
              </Row>
              <Row
                className={this.state.collection.length < 1 ? "hidden" : ""}
                style={{ marginBottom: "20px" }}
              >
                <Col sm={12} md={12} lg={12}>
                  <Card style={{ fontSize: '12px' }}>
                    <Card.Header as="h5">Daily Collection</Card.Header>
                    <Card.Body>
                      <Table striped responsive>
                        <thead>
                          <tr>
                            <th className="text-center">Voucher No.</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.collection.map(function (item) {
                            return (
                              <tr className="text-center" key={item._id}>
                                <td>
                                  {item.voucherno === "" ? "-" : item.voucherno}
                                </td>
                                <td>{item.amount}</td>
                                <td>
                                  {Moment(item.collectiondate).format(
                                    "MMM DD, YYYY"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted text-right">
                      {/* <MoreButton/>*/}
                      {this.state.collection.length >= 10 ? (
                        <Button variant="primary" block>
                          More...
                        </Button>
                      ) : null}
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row
                className={this.state.newvoucher.length < 1 ? "hidden" : ""}
                style={{ marginBottom: "20px" }}
              >
                <Col sm={12} md={12} lg={12}>
                  <Card style={{ fontSize: '12px' }}>
                    <Card.Header as="h5">Sales</Card.Header>
                    <Card.Body>
                      <Table striped responsive>
                        <thead>
                          <tr className="text-center">
                            <th className="text-center">Voucher No.</th>
                            <th className="text-center">Item No.</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.newvoucher.map(function (item) {
                            return (
                              <tr className="text-center" key={item._id}>
                                <td>{item.voucherno}</td>
                                <td>{item.itemno}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                                <td>
                                  {Moment(item.voucherdate).format(
                                    "MMM DD, YYYY"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {/* <MoreButton/>*/}
                      {this.state.newvoucher.length >= 10 ? (
                        <Button variant="primary" block>
                          More..
                        </Button>
                      ) : null}
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
              <Row className={this.state.returnitem.length < 1 ? "hidden" : ""}>
                <Col sm={12} md={12} lg={12}>
                  <Card style={{ fontSize: '12px' }}>
                    <Card.Header as="h5">Return</Card.Header>
                    <Card.Body>
                      <Table striped responsive>
                        <thead>
                          <tr>
                            <th className="text-center">Voucher No.</th>
                            <th className="text-center">Item No.</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Amount</th>
                            <th className="text-center">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.returnitem.map(function (item) {
                            return (
                              <tr className="text-center" key={item._id}>
                                <td>{item.voucherno}</td>
                                <td>{item.itemno}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                                <td>
                                  {Moment(item.returndate).format(
                                    "MMM DD, YYYY"
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {/* <MoreButton/>*/}
                      {this.state.returnitem.length >= 10 ? (
                        <Button variant="primary" block>
                          More..
                        </Button>
                      ) : null}
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}
