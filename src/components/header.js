import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem, Image, Row, Col } from 'react-bootstrap';
import RouterLink from '../components/commons/linkContainer';
import Storage from '../components/commons/localStogare';
import { Link } from 'react-router-dom';
import usericon from '../components/images/man.png';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userinfo:{
                fullname:'',
                email: '',
                usertype:''
            }
        }
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        Storage(localStorage).remove('loggedIn');
        Storage(localStorage).remove('username');       
    }

    componentDidMount(){
        var userinfo = Storage(localStorage).get('userinfo');
        this.setState({userinfo:userinfo});
    }

    render() {

        return (
            <div>
                <Navbar inverse collapseOnSelect fixedTop fluid>
                    <Navbar.Header>
                        <Navbar.Brand >
                            {/* <RouterLink to='/home' cssClass='navbar-brand' >KTH</RouterLink> */}
                            <Link to="/home">KTH</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title="Customer" id="basic-nav-dropdown">
                                <RouterLink to='/customer/list' role="menuitem" >Customer List </RouterLink>
                                <MenuItem divider />
                                <RouterLink to='/customer/add' role="menuitem" >Add Customer</RouterLink>
                            </NavDropdown>
                            <RouterLink to='/collection'>Collection</RouterLink>
                            <RouterLink to='/newvoucher'>Sales</RouterLink>
                            <RouterLink to='/returnitems'>Returns</RouterLink>
                        </Nav>

                        <Nav pullRight >
                            <NavDropdown eventKey={3} title={<div><Image src={usericon} responsive /></div>} id="user-nav-dropdown">
                                <MenuItem className="text-center user-menuitem-card" > 
                                    <Row style={{'marginBottom':'10px'}}>
                                        <Col  className="user-info-menuitem"><Image src={usericon} responsive /></Col>
                                    </Row>
                                    <Row>
                                        <Col >{this.state.userinfo.fullname}</Col>
                                    </Row>
                                    <Row>
                                        <Col >{this.state.userinfo.email}</Col>
                                    </Row>
                                </MenuItem>
                                <MenuItem divider />
                                <RouterLink to='/customer/list' role="menuitem" ><i className="fa fa-gear fa-fw"></i> Settings</RouterLink>
                                <MenuItem divider />
                                <RouterLink to='/login' onclick={this.onLogout}><i className="fa fa-sign-out fa-fw"></i> Logout</RouterLink>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}