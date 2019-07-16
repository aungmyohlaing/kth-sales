import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


export default class Footer extends Component {
    render() {
        return (           
            <div>
                <Navbar fixedBottom  >                                                               
                    <Navbar.Text className="footer-style text-center">&copy; Copyright 2018 KTH</Navbar.Text>
                    <Navbar.Text className="footer-style text-center">Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond" rel="noopener noreferrer" target="_blank">Icon Pond</a> from <a href="https://www.flaticon.com/" title="Flaticon" rel="noopener noreferrer" target="_blank" >www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" rel="noopener noreferrer" target="_blank" >CC 3.0 BY</a></Navbar.Text>
                </Navbar>
            </div>
        )
    }
}