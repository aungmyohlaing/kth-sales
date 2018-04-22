import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Row, Col, ButtonToolbar, Button, InputGroup } from 'react-bootstrap';
import Service from './services';

export default class capitalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    address1: '',
                    address2: ''
                }
            ]

        }
    }

    componentDidMount() {
        Service().get().then(res => {
            this.setState({ customers: res });
        })
    }

    render() {
        return (
            <div>
                <Form horizontal>

                    <FormGroup>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <FormControl componentClass="select" >
                                    <option value="">Select Customer</option>
                                    {
                                        this.state.customers.map(function (item) {
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        })
                                    }
                                </FormControl>
                                <FormControl.Feedback />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <InputGroup>
                                    <InputGroup.Addon><i className="fa fa-money fa" aria-hidden="true"></i></InputGroup.Addon>
                                    <FormControl type="text" placeholder="Enter Capital Amount" />
                                    <FormControl.Feedback />
                                </InputGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm={12} md={12} lg={12} >
                                <ButtonToolbar className="pull-right" >
                                    <Button bsStyle="primary"  >Save</Button>
                                    <Button bsStyle="danger"  >Cancel</Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}