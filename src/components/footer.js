import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


export default class Footer extends Component {
    render() {
        return (           
            <div>
                <Navbar fixedBottom={true} >                                                               
                    <Navbar.Text className="footer-style text-center">&copy; Copyright 2018 KTH</Navbar.Text>                                       
                </Navbar>
            </div>
        )
    }
}