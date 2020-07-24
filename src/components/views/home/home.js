import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../header";
import Footer from "../../footer";
import Storage from "../../../components/commons/localStogare";
import Services from "./service";
import Charts from "../../charts/chart";
import CustomerCards from "../../commons/customerCard";
import AverageByPeriod from "./averagePurchase";
import AverageReturnByPeriod from "./averageReturn";
import MonthlyTopItems from "./monthlyTopItems";
import CustomerService from "../customers/service";
import DeleteModal from "../../commons/modal";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topten: [
        {
          _id: "",
          name: "",
          email: "",
          mobile: "",
          phone: "",
          currentamount: "",
          salesamount: "",
          address1: "",
          address2: "",
        },
      ],
      currentMonthTotalSales: "",
      lastMonthTotalSales: "",
      currentYearTotalSales: "",
      lastYearTotalSales: "",
      currentMonthTotalReturn: "",
      lastMonthTotalReturn: "",
      currentYearTotalReturn: "",
      lastYearTotalReturn: "",
      cusId: "",
      isModalShow: false,
      modalBodyText: [
        {
          heading: "Are you sure to delete this customer?",
          bodyText:
            "It will delete all the reference of this customer as well.",
        },
      ],
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.onYesClick = this.onYesClick.bind(this);
  }

  /**
   * Checke User already login or not?
   */
  componentDidMount() {
    var loggedIn = Storage(localStorage).get("loggedIn");
    var self = this;
    if (!loggedIn) {
      self.props.history.push("/login");
    } else {
      Services()
        .getTopTen()
        .then((res) => {
          self.setState({ topten: res });
        });
    }
  }

  handleModalClose() {
    this.setState({ isModalShow: false });
  }

  handleModalShow(id) {
    this.setState({ isModalShow: true, cusId: id });
    // console.log("Customer ID", id);
  }

  onYesClick() {   
    CustomerService()
      .deleteCustomer(this.state.cusId)
      .then(() => {
        this.handleModalClose();
        //history.push("/customer/list");
        //location.href("/customer/list");
        Services()
        .getTopTen()
        .then((res) => {
          this.setState({ topten: res });
        });
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div id="mainview">
          <div className="container">
            <h2>Sales</h2>
            <hr />
            <Row>
              <Col sm={12} md={12} lg={3}>
                <AverageByPeriod
                  title="Average Purchase By Month"
                  description="Compare to last month"
                  averageby="month"
                />
                <AverageByPeriod
                  title="Average Purchase By Year"
                  description="Compare to last year"
                  averageby="year"
                />
                <MonthlyTopItems
                  type="selling"
                  title="This Month Top Selling Items"
                />
              </Col>
              <Col sm={12} md={12} lg={9}>                
                <Charts
                  type="bar"
                  height={167}
                  chartfor="sales"
                  title="This Year Sales"
                />
              </Col>
            </Row>
            <hr />
            <h2>Returns</h2>
            <hr/>
            <Row>
              <Col sm={12} md={12} lg={3}>
                <AverageReturnByPeriod
                  title="Average Return By Month"
                  description="Compare to last month"
                  averageby="month"
                />
                <AverageReturnByPeriod
                  title="Average Return By Year"
                  description="Compare to last year"
                  averageby="year"
                />
                <MonthlyTopItems
                  type="return"
                  title="This Month Most Return Items"
                />
              </Col>

              <Col sm={12} md={12} lg={9}>
                <Charts
                  type="doughnut"
                  chartfor="return"
                  title="This Year Return"
                />
              </Col>
            </Row>
            <hr />
            {/* Top Ten Customers Section */}
            <h2>Top Ten Customers</h2>
            <hr />
            <Row >
              <CustomerCards dataList={this.state.topten} handleModalShow={this.handleModalShow} />
            </Row>
          </div>
          <DeleteModal
            show={this.state.isModalShow}
            title={"Customer Deleting..."}
            bodyText={this.state.modalBodyText}
            onNo={this.handleModalClose}
            onYes={this.onYesClick}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
