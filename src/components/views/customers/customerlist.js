import React, { Component } from "react";
import { Row, Form, InputGroup, Button } from "react-bootstrap";
import Service from "./service";
import Header from "../../header";
import Footer from "../../footer";
import CustomerCards from "../../commons/customerCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DeleteModal from "../../commons/modal";
import Loading from "../../commons/loading";
export default class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [
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
      searchresult: [
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
      search: "",
      cusId: "",
      isModalShow: false,
      modalBodyText: [
        {
          heading: "Are you sure to delete this customer?",
          bodyText:
            "It will delete all the reference of this customer as well.",
        },
      ],
      Loading: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.checkname = this.checkname.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.onYesClick = this.onYesClick.bind(this);
  }

  componentDidMount() {
    this.setState({ Loading: true });
    Service()
      .get()
      .then((res) => {
        this.setState({ customers: res, searchresult: res, Loading: false });
      });
  }

  checkname(customer) {
    return customer.name === "STK";
  }

  onHandleChange(e) {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });

    var SearchResult = this.state.customers.filter(function (customer) {
      var nidex = customer.name
        .toLowerCase()
        .indexOf(e.target.value.toLowerCase());
      if (nidex !== -1) {
        return customer;
      } else return null;
    });

    this.setState({ searchresult: SearchResult });
  }

  handleModalClose() {
    this.setState({ isModalShow: false });
  }

  handleModalShow(id) {
    this.setState({ isModalShow: true, cusId: id });
    // console.log("Customer ID", id);
  }

  onYesClick() {   
    Service()
      .deleteCustomer(this.state.cusId)
      .then(() => {
        this.handleModalClose();
        //history.push("/customer/list");
        //location.href("/customer/list");
        Service()
          .get()
          .then((res) => {
            this.setState({ customers: res, searchresult: res });
          });
      });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.Loading ? (<Loading />) : (
        <div id="mainview" className="container">
          <h2>
            Customer <small>List</small>
          </h2>
          <div className="text-right" style={{ marginTop: "-40px" }}>
            <Button variant="primary" as={Link} to="/customer/add">
              <FontAwesomeIcon icon={faPlusCircle} /> Add Customer
            </Button>
          </div>
          <hr />
          <Form>
            <Form.Group size="large">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <i className="fa fa-search fa" aria-hidden="true"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search.."
                  value={this.state.search}
                  onChange={this.onHandleChange}
                />
              </InputGroup>
            </Form.Group>
          </Form>
          <Row>
            {/* Users Card Component */}
            <CustomerCards
              dataList={this.state.searchresult}
              handleModalShow={this.handleModalShow}
            />
          </Row>
          <DeleteModal
            show={this.state.isModalShow}
            title={"Customer Deleting..."}
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
