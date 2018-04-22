import React, { Component } from 'react';
import { PageHeader, Col } from 'react-bootstrap';
import Header from '../../../components/header';
import CapitalForm from './form';


export default class Capital extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <PageHeader>
                        Add Capital <small>amount for a customer</small>
                    </PageHeader>
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
