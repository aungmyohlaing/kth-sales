import React, { Component } from "react";
import { Row, Col, Table, Button, Card, Dropdown } from "react-bootstrap";
import Header from "../../header";
import Footer from "../../footer";
import userlogo from "../../images/businessman.png";
import Service from "./service";
import Moment from "moment";
import DeleteModal from "../../commons/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoadCustomerById } from "../../../redux/actions";
import Storage from "../../commons/localStogare";
import Loading from "../../commons/loading";

const CustomToogle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant="link"
    size="sm"
    style={{
      color: "white",
      textDecoration: "none",
      boxShadow: "none",
      width: "30px",
      height: "40px",
    }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threeDots"></span>
  </Button>
));

class Detail extends Component {
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
      isModalShow: false,
      modalBodyText: [
        {
          heading: "Are you sure to delete this customer?",
          bodyText:
            "It will delete all the reference of this customer as well.",
        },
      ],
      userinfo: {
        fullname: "",
        email: "",
        usertype: "",
      },
      Loading: false,
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.onYesClick = this.onYesClick.bind(this);
  }

  handleModalClose() {
    this.setState({ isModalShow: false });
  }

  handleModalShow() {
    this.setState({ isModalShow: true });
  }

  onYesClick() {
    const { history } = this.props;

    Service()
      .deleteCustomer(this.state.customer._id)
      .then(() => {
        this.handleModalShow();
        history.push("/customer/list");
      });
  }

  componentDidMount() {
    const userinfo = Storage(localStorage).get("userinfo");
    this.setState({ userinfo: userinfo, Loading: true });
    const {
      match: { params },
    } = this.props;

    // Get Customer from Redux by Customer Id
    this.props.LoadCustomerById(params.id);

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
        this.setState({ returnitem: res, Loading: false });        
      });
  }

  render() {
    // function MoreButton(){
    //     if(this.state.collection.lenght >= 7){
    //         return <Button bsStyle="primary" block>More..</Button>
    //     }
    //     else return null;
    // }
    let self = this;

    function RenderDetailOrEmpty() {
      if (self.state.customer.salesamount === 0) {
        return (
          <div
            style={{
              textAlign: "center",
              fontSize: "15pt",
              color: "Silver",
              marginTop: "100px",
            }}
          >
            Start selling to this customer.
            <div style={{ marginTop: "5px" }}>
              <Button variant="primary" size="lg" as={Link} to="/newvoucher">
                Sales
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div>
          <Row>
            <Col sm={12} md={12} lg={4}>
              <Card
                bg="info"
                text="light"
                className="text-center"
                style={{ marginBottom: "15px" }}
              >
                <Card.Header as="h4">Sales Amount</Card.Header>
                <Card.Body>
                  <Card.Text as="h5">
                    {self.props.customer.salesamount} MMK
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <Card
                bg="info"
                text="light"
                className="text-center"
                style={{ marginBottom: "15px" }}
              >
                <Card.Header as="h4">Paid Amount</Card.Header>
                <Card.Body>
                  <Card.Text as="h5">
                    {self.props.customer.salesamount -
                      self.props.customer.currentamount}{" "}
                    MMK
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <Card
                bg="info"
                text="light"
                className="text-center"
                style={{ marginBottom: "15px" }}
              >
                <Card.Header as="h4">Remaining Amount</Card.Header>
                <Card.Body>
                  <Card.Text as="h5">
                    {self.props.customer.currentamount} MMK
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row
            className={self.state.collection.length < 1 ? "hidden" : ""}
            style={{ marginBottom: "20px" }}
          >
            <Col sm={12} md={12} lg={12}>
              <Card style={{ fontSize: "12px" }}>
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
                      {self.state.collection.map(function (item) {
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
                  {self.state.collection.length >= 10 ? (
                    <Button variant="primary" block>
                      More...
                    </Button>
                  ) : null}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row
            className={self.state.newvoucher.length < 1 ? "hidden" : ""}
            style={{ marginBottom: "20px" }}
          >
            <Col sm={12} md={12} lg={12}>
              <Card style={{ fontSize: "12px" }}>
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
                      {self.state.newvoucher.map(function (item) {
                        return (
                          <tr className="text-center" key={item._id}>
                            <td>{item.voucherno}</td>
                            <td>{item.itemno}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                            <td>
                              {Moment(item.voucherdate).format("MMM DD, YYYY")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {/* <MoreButton/>*/}
                  {self.state.newvoucher.length >= 10 ? (
                    <Button variant="primary" block>
                      More..
                    </Button>
                  ) : null}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row className={self.state.returnitem.length < 1 ? "hidden" : ""}>
            <Col sm={12} md={12} lg={12}>
              <Card style={{ fontSize: "12px" }}>
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
                      {self.state.returnitem.map(function (item) {
                        return (
                          <tr className="text-center" key={item._id}>
                            <td>{item.voucherno}</td>
                            <td>{item.itemno}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                            <td>
                              {Moment(item.returndate).format("MMM DD, YYYY")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {/* <MoreButton/>*/}
                  {self.state.returnitem.length >= 10 ? (
                    <Button variant="primary" block>
                      More..
                    </Button>
                  ) : null}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div>
        <Header />
        { this.state.Loading ? (<Loading />) : (
        <div id="mainview" className="container">
          <div>
            <h2>
              Customer <small>Detail</small>
            </h2>
            {/* <div className="text-right" style={{ marginTop: "-40px" }}>
              
              <Button
                variant="Link"
                style={{ color: "silver", boxShadow: "none", height: "20px" }}
                onClick={this.handleModalShow}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div> */}
          </div>
          <hr />
          <Row>
            <Col xs={12} sm={12} md={4} lg={3}>
              <Card
                bg="dark"
                text="light"
                style={{ fontSize: "12px", marginBottom: "15px" }}
              >
                <Dropdown
                  style={{ position: "absolute", right: "0px" }}
                  alignRight
                >
                  <Dropdown.Toggle as={CustomToogle} />
                  <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item
                      as={Link}
                      to={"/newvoucher/" + this.props.customer._id}
                    >
                      Sales
                    </Dropdown.Item>
                    <Dropdown.Item>Collect</Dropdown.Item>
                    <Dropdown.Item>Returns</Dropdown.Item>
                    {this.state.userinfo.usertype === "Admin" ? (
                      <div>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={this.handleModalShow}>
                          {" "}
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </Dropdown.Item>
                      </div>
                    ) : (
                      ""
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Card.Img
                  className="text-center"
                  variant="top"
                  src={userlogo}
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />
                <Card.Body style={{ padding: "5px !important" }}>
                  <Card.Text>
                    <strong>Name: </strong>
                    {this.props.customer.name}
                  </Card.Text>
                  {this.props.customer.email !== "" ? (
                    <Card.Text>
                      <strong>Email: </strong>
                      {this.props.customer.email}
                    </Card.Text>
                  ) : null}
                  <Card.Text>
                    <strong>Mobile: </strong>
                    {this.props.customer.mobile}
                  </Card.Text>
                  {this.props.customer.phone !== "" ? (
                    <Card.Text>
                      <strong>Phone: </strong>
                      {this.props.customer.phone}
                    </Card.Text>
                  ) : null}
                  <Card.Text>
                    <strong>Address 1: </strong>
                    {this.props.customer.address1}
                  </Card.Text>
                  {this.props.customer.address2 !== "" ? (
                    <Card.Text>
                      <strong>Address 2: </strong>
                      {this.props.customer.address2}
                    </Card.Text>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={8} lg={9}>
              <RenderDetailOrEmpty />
            </Col>
          </Row>
          <DeleteModal
            show={this.state.isModalShow}
            title="Customer Deleting..."
            bodyText={this.state.modalBodyText}
            onNo={this.handleModalClose}
            onYes={this.onYesClick}
          />
        </div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoadCustomerById: (id) => dispatch(LoadCustomerById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
