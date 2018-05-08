import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import Header from '../../header';
import ReturnForm from './form';
import Footer from '../../footer';

export default class ReturnItems extends Component {
    render() {
        return (
            <div >
                <Header />
                <div id="mainview" className="container">
                    <PageHeader>Return <small>add return items</small></PageHeader>
                    <ReturnForm formtype={'returnvoucher'}/>
                </div>
                <Footer />
            </div>
        )
    }
}