import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Header from '../../../components/header';
import CapitalForm from './form';


export default class Capital extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div>
                        Add Capital <small>amount for a customer</small>
                    </div>
                    <div style={{ margin: '35px' }}>
                        <Col xs={12} md={6} lg={6} lgOffset={3}>
                            <CapitalForm />
                        </Col>

                    </div>

                </div>
            </div>
        )
    }
}
