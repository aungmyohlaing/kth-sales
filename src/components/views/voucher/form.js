import React, { Component } from 'react';
import { Row, Col, Form, FormControl, FormGroup, ButtonToolbar, Button, OverlayTrigger, Popover, ControlLabel } from 'react-bootstrap';
import DateTimePicker from '../../commons/datepicker';
import moment from 'moment';
import Select from '../../commons/selectComponet';
import 'react-select/dist/react-select.css';
import SaveAlert from '../../commons/alert';
import Service from './service';

export default class frmVoucher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voucherdate: moment(),
            voucherno: '',
            itemno: '',
            itemname: '',
            quantity: '',
            price: '',
            amount: '',
            selectedOptions: '',
            selectValidation: null,
            vouchernoValidation: null,
            itemnoValidation: null,
            itemnameValidation: null,
            quantityValidation: null,
            priceValidation: null,
            showAlert: false,
            createdate: moment(),
            voucherData: [{
                customerid: '',
                voucherno: ''
            }],
            selectTo:''            

        }

        this.DatehandlerChange = this.DatehandlerChange.bind(this);
        this.onhandlerChange = this.onhandlerChange.bind(this);
        this.onHandlerKeyDown = this.onHandlerKeyDown.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.onhandleDissmis = this.onhandleDissmis.bind(this);
        this.alertDissmis = this.alertDissmis.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentWillMount(){
        if (this.props.formtype === 'newvoucher') 
            this.setState({selectTo: 'customers'});
        else this.setState({selectTo:'return-customers'});
    }

    /**
     * 
     * Set Current Date to Datepicker
     */
    DatehandlerChange(date) {
        this.setState({ voucherdate: date });
    }

    /*
    On Change event on Textbox and reset validation to null
    */
    onhandlerChange(e) {
        var name = e.target.name;
        this.setState({ [name]: e.target.value });
        this.setState({
            vouchernoValidation: null,
            itemnoValidation: null,
            itemnameValidation: null,
            quantityValidation: null,
            priceValidation: null
        });
    }
    /**
     * 
     * Enter on price text box to calculated amount to show
     */
    onHandlerKeyDown(e) {
        if (e.keyCode === 13) {
            var amount = this.state.price * this.state.quantity;
            this.setState({ amount: amount });
        }
    }

    /**
     * Dissmis alert when click on alert show after save successfully.
     */

    onhandleDissmis() {
        this.setState({ showAlert: false });
    }

    /**
     * Hide alert with timer
     */
    alertDissmis() {
        setTimeout(() => {
            this.setState({ showAlert: false });
        }, 3000)
    }

    /**
     * 
     * Handle lost focus on price and quantity text box to calculate amount 
     */
    handleOnBlur(e) {
        var amount = this.state.price * this.state.quantity;
        this.setState({ amount: amount });
    }

    /**
     * On change on Customer Select control
     */
    selectedHandleChange = (selectedOptions) => {
        this.setState({ selectedOptions, selectValidation: null });
        if (selectedOptions === null || selectedOptions === undefined) {
            //console.log('Selected Value Null');
            this.setState({ selectedOptions: '' });
        }
        else {

            Service().getVocById(selectedOptions.value).then(res => {

                this.setState({ voucherData: res });

                console.log('Vouchers Data', this.state.voucherData);
            })
        }
        //console.log(`Selected: ${selectedOptions.value}`);
    }

    selectedVoucherNoHandleChange = (voucherno) => {

        this.setState({ voucherno, selectVoucherValidation: null });
        if (voucherno === null || voucherno === undefined) {
            //console.log('Selected Value Null');
            this.setState({ voucherno: '' });
        }
        //console.log(`Selected:`, this.state.selectedOptions.value);
    }

    /**
     * Save data to mongo DB
     */
    onSaveClick() {
        var numbers = /^[0-9]+$/;

        if (this.state.selectedOptions === '' || this.state.selectedOptions === undefined) {
            this.setState({ selectValidation: 'error' });
        }
        else if (this.state.voucherno === '' || this.state.voucherno === undefined) {
            this.setState({ vouchernoValidation: 'error' });
        }
        else if (this.state.itemno === '' || this.state.itemno === undefined) {
            this.setState({ itemnoValidation: 'error' });
        }
        else if (this.state.itemname === '' || this.state.itemname === undefined) {
            this.setState({ itemnameValidation: 'error' });
        }
        else if (this.state.quantity === '' || this.state.quantity === undefined) {
            this.setState({ quantityValidation: 'error' });
        }
        else if (this.state.price === '' || this.state.price === undefined) {
            this.setState({ priceValidation: 'error' });
        }
        else if (!this.state.quantity.match(numbers)) {
            this.setState({ quantityValidation: 'error' });
        }
        else if (!this.state.price.match(numbers)) {
            this.setState({ priceValidation: 'error' });
        }
        else {

            if (this.props.formtype === 'newvoucher') {
                
                let newVoucherCollection = {
                    customerid: this.state.selectedOptions.value,
                    voucherdate: this.state.voucherdate,
                    voucherno: this.state.voucherno,
                    itemno: this.state.itemno,
                    itemname: this.state.itemname,
                    quantity: this.state.quantity,
                    price: this.state.price,
                    amount: this.state.amount,
                    createdate: moment()
                }

                Service().newvoucher_save(newVoucherCollection).then(res => {

                    let updateCustomer = {
                        customerid: this.state.selectedOptions.value,
                        amount: this.state.amount
                    }

                    Service().newvoucher_update_customer(updateCustomer).then(res => {
                        this.onCancelClick();
                        this.setState({ showAlert: true });
                        this.alertDissmis();
                    })

                })
            } else {               
                
                let returnItemCollection = {
                    customerid: this.state.selectedOptions.value,
                    returndate: this.state.voucherdate,
                    voucherno: this.state.voucherno.value,
                    itemno: this.state.itemno,
                    itemname: this.state.itemname,
                    quantity: this.state.quantity,
                    price: this.state.price,
                    amount: this.state.amount,
                    createdate: moment()
                }

                Service().returnitem_save(returnItemCollection).then(res => {

                    let updateCustomer = {
                        customerid: this.state.selectedOptions.value,
                        amount: this.state.amount
                    }

                    Service().returnitem_update_customer(updateCustomer).then(res => {
                        this.onCancelClick();
                        this.setState({ showAlert: true });
                        this.alertDissmis();
                    })

                })
            }

        }
    }

    /**
     * Clear text fields, Sekect abd date control
     */

    onCancelClick() {
        this.setState({
            voucherdate: moment(),
            voucherno: '',
            itemno: '',
            itemname: '',
            quantity: '',
            price: '',
            amount: '',
            selectedOptions: '',
            selectValidation: null,
            vouchernoValidation: null,
            itemnoValidation: null,
            itemnameValidation: null,
            quantityValidation: null,
            priceValidation: null,
            showAlert: false
        })
    }

    render() {
        var self = this;
        const { formtype } = this.props;
        /**
         * Show pop up messages on price and quantity 
         */
        const popoverFocus = (
            <Popover id="popover-positioned-scrolling-left" title="">
                Please enter numbers only.
            </Popover>
        );        

        return (

            <div>
                <Form>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.selectValidation}>
                                <ControlLabel>Customers: {this.state.selectTo}</ControlLabel>
                                <Select selectedOptions={this.state.selectedOptions}
                                    selectedHandleChange={this.selectedHandleChange}
                                    placeHolder="Select a customer"
                                    selectTo={this.state.selectTo} />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup>
                                <ControlLabel>Voucher Date</ControlLabel>
                                <DateTimePicker
                                    selected={this.state.voucherdate}
                                    onChange={this.DatehandlerChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.vouchernoValidation}>
                                <ControlLabel>Voucher No.</ControlLabel>
                               
                                {
                                    (formtype === 'newvoucher') ?
                                    <FormControl
                                        name="voucherno"
                                        type="text"
                                        value={self.state.voucherno}
                                        onChange={self.onhandlerChange}
                                        placeholder="Voucher No."
                                    />
                                :
                                   <Select
                                    selectedOptions={self.state.voucherno}
                                    selectedHandleChange={self.selectedVoucherNoHandleChange}
                                    placeHolder="Select a voucher"
                                    selectTo="voucherno"
                                    voudata={self.state.voucherData} />

                                }
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.itemnoValidation}>
                                <ControlLabel>Item No.</ControlLabel>
                                <FormControl
                                    name="itemno"
                                    type="text"
                                    value={this.state.itemno}
                                    onChange={this.onhandlerChange}
                                    placeholder="Item No."
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>

                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.itemnameValidation}>
                                <ControlLabel>Item Name</ControlLabel>
                                <FormControl
                                    name="itemname"
                                    type="text"
                                    value={this.state.itemname}
                                    onChange={this.onhandlerChange}
                                    placeholder="Item Name"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.quantityValidation}>
                                <ControlLabel>Quantity</ControlLabel>
                                <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
                                    <FormControl
                                        name="quantity"
                                        type="text"
                                        value={this.state.quantity}
                                        onChange={this.onhandlerChange}
                                        onBlur={this.handleOnBlur}
                                        placeholder="Quantity"
                                    />

                                </OverlayTrigger>
                                <FormControl.Feedback />
                            </FormGroup>

                        </Col>
                    </Row>
                    <Row>

                        <Col sm={12} md={6} lg={6}>
                            <FormGroup validationState={this.state.priceValidation}>
                                <ControlLabel>Price</ControlLabel>
                                <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
                                    <FormControl
                                        name="price"
                                        type="text"
                                        value={this.state.price}
                                        onChange={this.onhandlerChange}
                                        onKeyDown={this.onHandlerKeyDown}
                                        onBlur={this.handleOnBlur}
                                        placeholder="Price"
                                    />
                                </OverlayTrigger>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <FormGroup >
                                <ControlLabel>Amount</ControlLabel>{' '}
                                <FormControl
                                    name="amount"
                                    type="text"
                                    value={this.state.amount}
                                    onChange={this.onhandlerChange}
                                    placeholder="Amount"
                                    readOnly={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <SaveAlert showAlert={this.state.showAlert}
                                onDismiss={this.onhandleDissmis}
                                alertStyle="success"
                                alertMessage="Successfully Saved!" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <ButtonToolbar className="pull-right">
                                <Button bsStyle="primary" bsSize="large" onClick={this.onSaveClick} >Save</Button>
                                <Button bsStyle="danger" bsSize="large" onClick={this.onCancelClick}>Cancel</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
