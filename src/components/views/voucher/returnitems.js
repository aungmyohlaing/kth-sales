import React, { Component } from 'react';
import Header from '../../header';
import ReturnForm from './form';
import Footer from '../../footer';

export default class ReturnItems extends Component {
    render() {
        return (
            <div >
                <Header />
                <div id="mainview" className="container">
                    <h2>Return <small>add return items</small></h2>
                    <hr/>
                    <ReturnForm formtype={'return-customers'}/>
                </div>
                <Footer />
            </div>
        )
    }
}