import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Grid, Row, Col, ButtonToolbar, Button, ControlLabel, InputGroup } from 'react-bootstrap';
import Service from './service';
import DateTimePicker from '../../commons/datepicker';
import moment from 'moment';
import SaveAlert from '../../commons/alert';
import Select from '../../commons/selectComponet';

export default class CollectionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerById: [
                {
                    _id: '',
                    name: '',
                    email: '',
                    mobile: '',
                    phone: '',
                    capital: '',
                    address1: '',
                    address2: ''
                }
            ],
            customerid: '',
            amount: '',
            voucherno: '',
            selectedDate: moment(),
            createDate: moment(),
            selectedOptions: '',
            selectValidation: null,
            voucherValidation: null,
            customerValidation: null,
            amountValidation: null,
            showAlert: false,
            alertStyle:'',
            alertMessage: '',
            cuamount: '',
            collectedamount: ''            
        }


        this.handlerChange = this.handlerChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.DatehandlerChange = this.DatehandlerChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onhandleDissmis = this.onhandleDissmis.bind(this);
        this.alertDissmis = this.alertDissmis.bind(this);
    }

    handlerChange(e) {
        var name = e.target.name;

        this.setState({ [name]: e.target.value, voucherValidation: null, amountValidation: null, customerValidation: null });
    }

    DatehandlerChange(date) {
        this.setState({ selectedDate: date });
    }

    onhandleDissmis() {
        this.setState({ showAlert: false });
    }

    selectedHandleChange = (selectedOptions) => {

        this.setState({ selectedOptions, selectValidation: null });
        if (selectedOptions === null || selectedOptions === undefined) {
            this.setState({ selectedOptions: '' });
        } else {
            Service().getById(selectedOptions.value).then(res => {
                this.setState({
                    customerById: res,
                    voucherValidation: null,
                    amountValidation: null,
                    customerValidation: null,
                    cuamount: ''
                });
            })

        }
    }

    alertDissmis() {
        setTimeout(() => {
            this.setState({ showAlert: false });
        }, 3000)
    }

    onSave() {

        if (this.state.selectedOptions === undefined || this.state.selectedOptions === '') {
            this.setState({ selectValidation: 'error' });
        }
        else if (this.state.amount === undefined || this.state.amount === '') {
            this.setState({ amountValidation: 'error' });
        }
        else {            
            let isvoucher;
            if (this.state.voucherno === '') {
                isvoucher = true;
            } else {                 
                 Service().checkVoucher(this.state.customerById._id, this.state.voucherno).then(res => {                    
                    isvoucher = res;
                });
                }

            if (isvoucher) {
                let collectionData = {
                    customerid: this.state.customerById._id,
                    voucherno: this.state.voucherno,
                    selectedDate: this.state.selectedDate,
                    createDate: this.state.createDate,
                    amount: this.state.amount
                }

                Service().save(collectionData).then(res => {

                    let updatedAmount = this.state.customerById.currentamount - this.state.amount;
                    let updateCustomerAmt = {
                        customerid: this.state.customerById._id,
                        currentamount: updatedAmount
                    }

                    Service().update_customer(updateCustomerAmt).then(res => {
                        this.onCancel();
                    });

                    this.setState({ showAlert: true, alertStyle:'success', alertMessage: 'Successfully Saved!' });
                    this.alertDissmis();
                })
            }
            else {
                this.setState({ voucherValidation: 'error' });
                this.setState({ showAlert: true, alertStyle:'danger', alertMessage: 'Voucher number is not correct.' });
                this.alertDissmis();
            }

        }

    }

    onCancel() {
        this.setState({
            customerById: '',
            selectedOptions: '',
            selectedVoucherOptions: '',
            selectedDate: moment(),
            amount: '',
            cuamount: '',
            collectedamount: '',
            customerid: '',
            customerValidation: null,
            amountValidation: null,
            selectValidation: null,
            selectVoucherValidation: null,
            voucherValidation: null
        });

    }

    render() {
        return (
            <div>
                <Form>
                    <Grid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className="collecth2">Sales Amount: {this.state.customerById.salesamount === undefined ?
                                    <span className="empty-span"><br />Please select a customer to see amount</span> :
                                    this.state.customerById.salesamount + 'K'}</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className="collecth2">Current Amount: {this.state.customerById.currentamount === undefined ?
                                    <span className="empty-span"><br />Please select a customer to see amount</span> :
                                    this.state.customerById.currentamount + 'K'}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <FormGroup validationState={this.state.selectValidation}>
                                    <ControlLabel>Customers</ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-user fa" aria-hidden="true"></i></InputGroup.Addon>
                                        <Select selectedOptions={this.state.selectedOptions}
                                            placeHolder="Select a customer"
                                            selectedHandleChange={this.selectedHandleChange}
                                            selectTo="return-customers" />
                                        <FormControl.Feedback />
                                    </InputGroup>

                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6} lg={6} >
                                <ControlLabel>Collection Date</ControlLabel>
                                <DateTimePicker
                                    selected={this.state.selectedDate}
                                    onChange={this.DatehandlerChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <FormGroup validationState={this.state.voucherValidation} >
                                    <ControlLabel>Voucher No.</ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon><i className="fa fa-hashtag fa" aria-hidden="true"></i></InputGroup.Addon>
                                        <FormControl
                                            type="text"
                                            name="voucherno"
                                            value={this.state.voucherno}
                                            onChange={this.handlerChange}
                                            placeholder="Voucher Number">
                                        </FormControl>

                                        <FormControl.Feedback />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Row>
                                    <Col sm={12} md={12} lg={12}>
                                        <FormGroup validationState={this.state.amountValidation}>
                                            <ControlLabel>Collection Amount</ControlLabel>
                                            <InputGroup>
                                                <InputGroup.Addon><i className="fa fa-money fa" aria-hidden="true"></i></InputGroup.Addon>
                                                <FormControl
                                                    type="text"
                                                    name="amount"
                                                    value={this.state.amount}
                                                    onChange={this.handlerChange}
                                                    placeholder="Amount">
                                                </FormControl>
                                                <FormControl.Feedback />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12}>
                                <SaveAlert showAlert={this.state.showAlert}
                                    onDismiss={this.onhandleDissmis}
                                    alertStyle={this.state.alertStyle}
                                    alertMessage={this.state.alertMessage} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} lg={12} >
                                <ButtonToolbar className="pull-right" >
                                    <Button bsStyle="primary" bsSize="large" onClick={this.onSave} >Save</Button>
                                    <Button bsStyle="danger" bsSize="large" onClick={this.onCancel}>Cancel</Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>

                    </Grid>
                </Form>
            </div>
        )
    }
}