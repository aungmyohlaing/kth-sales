import React, { Component } from 'react';
import { Col, Button, Navbar, Nav } from 'react-bootstrap';
import RouterLink from '../../commons/linkContainer';
import Footer from '../../footer';

export default class thankyou extends Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            KTH Ledger
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <RouterLink to='/register'>Register</RouterLink>
                            <RouterLink to='/login'>Login</RouterLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container thankyoubox">
                    <Col xs={12} md={6} lg={6} mdOffset={3} lgOffset={3} className="text-center">
                        
                            <div>
                                <h1>Thank You!</h1>
                                <h4>Your registration is successfully completed.</h4>
                                <p><Button bsStyle="primary" href="/login" >Please Login Here</Button></p>
                            </div>
                        


                    </Col>
                </div>
                <Footer/>
            </div>
        )
    }
}