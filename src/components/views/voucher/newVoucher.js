import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import Header from '../../header';
import Footer from '../../footer';
import VoucherForm from './form';

export default class newVoucher extends Component{    
    render(){
        return (
            <div>
                <Header/>
                <div id="mainview" className="container">
                    <PageHeader> Sales <small> add new voucher</small> </PageHeader>
                    <VoucherForm formtype={'newvoucher'}/>
                </div>    
                <Footer/>            
            </div>
        )
    }
}