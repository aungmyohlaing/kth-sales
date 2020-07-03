import React, { Component } from "react";
import { Row, Form, InputGroup } from "react-bootstrap";
import Service from "./service";
import Header from "../../header";
import Footer from "../../footer";
import UserCards from "../../commons/userCard";

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
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.checkname = this.checkname.bind(this);
  }

  componentDidMount() {
    Service()
      .get()
      .then((res) => {
        this.setState({ customers: res, searchresult: res });
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

  render() {
    return (
      <div>
        <Header />
        <div id="mainview" className="container">
          <h2>
            Customer <small>List</small>
          </h2>
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
            <UserCards dataList={this.state.searchresult} />
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}
