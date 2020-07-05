import React, { Component } from "react";
import {
  Nav,
  Navbar,
  Button,
  Image,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import Storage from "../components/commons/localStogare";
import { Link } from "react-router-dom";
import usericon from "../components/images/man.png";

const CustomToogle = React.forwardRef(({ children, onClick }, ref) => (

  <Button
    variant="link"
    size="sm"    
    ref={ref}
    style={{ boxShadow: 'none' }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}    
  </Button>  
));

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
              <Nav.Link as={Link} to="/customer/add">
                Add customer
              </Nav.Link>
              <Nav.Link as={Link} to="/customer/list">
                Customers
              </Nav.Link>
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
              <Dropdown                
                alignRight
              >
                <Dropdown.Toggle as={CustomToogle} >
                  <span>
                    <Image src={usericon} />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu size="sm" title="" >
                  <Dropdown.Header className="text-center">
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
                  </Dropdown.Header>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item as={Link} to="/customer/list" ><i className="fa fa-gear fa-fw"></i> Settings</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/login" onClick={this.onLogout}><i className="fa fa-sign-out fa-fw"></i> Logout</Dropdown.Item>                  
                </Dropdown.Menu>
              </Dropdown>
              {/* <NavDropdown
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
                <NavDropdown.Item as={Link} to="/customer/list">
                  <i className="fa fa-gear fa-fw"></i> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/login" onClick={this.onLogout}>
                  <i className="fa fa-sign-out fa-fw"></i> Logout
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
