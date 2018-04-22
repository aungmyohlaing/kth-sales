import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import RouterLink from '../components/commons/linkContainer';
import Storage from '../components/commons/localStogare';
import {Link} from 'react-router-dom';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        Storage(localStorage).remove('loggedIn');
        Storage(localStorage).remove('username');
        //window.location.href = '/login';
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
                        <Nav >
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
                            <RouterLink to='/login' onclick={this.onLogout}>Logout</RouterLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
           </div>
        )
    }
}