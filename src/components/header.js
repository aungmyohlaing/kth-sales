import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Row,
  Col
} from "react-bootstrap";
import Storage from "../components/commons/localStogare";
import { Link } from "react-router-dom";
import usericon from "../components/images/man.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        fullname: "",
        email: "",
        usertype: "",
      },
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    Storage(localStorage).remove("loggedIn");
    Storage(localStorage).remove("username");
  }

  componentDidMount() {
    var userinfo = Storage(localStorage).get("userinfo");
    this.setState({ userinfo: userinfo });
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/home">
            KTH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Customer" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/customer/list">
                  Customer List
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/customer/add">
                  Add Customer
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/collection">
                Collection
              </Nav.Link>
              <Nav.Link as={Link} to="/newvoucher">
                Sales
              </Nav.Link>
              <Nav.Link as={Link} to="/returnitems">
                Returns
              </Nav.Link>
              {this.state.userinfo.usertype === "Admin" ? (
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>

            <Nav>
              
              <NavDropdown
                title={
                  <span>
                    <Image src={usericon} />
                  </span>
                }
                id="user-nav-dropdown"
                alignRight
              >
                <NavDropdown.Header className="text-center">
                  <Row style={{ marginBottom: "10px" }}>
                    <Col className="user-info-menuitem">
                      <Image src={usericon} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>{this.state.userinfo.fullname}</Col>
                  </Row>
                  <Row>
                    <Col>{this.state.userinfo.email}</Col>
                  </Row>
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/customer/list"                  
                >
                  <i className="fa fa-gear fa-fw"></i> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  onClick={this.onLogout}                  
                >
                  <i className="fa fa-sign-out fa-fw"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>            
          </Navbar.Collapse>
        </Navbar>        
      </div>
    );
  }
}
