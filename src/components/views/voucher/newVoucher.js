import React, {Component} from 'react';
import Header from '../../header';
import Footer from '../../footer';
import VoucherForm from './form';

export default class newVoucher extends Component{    
    render(){
        return (
            <div>
                <Header/>
                <div id="mainview" className="container">
                    <h2> Sales <small> add new voucher</small> </h2>
                    <hr/>
                    <VoucherForm formtype={'customers'}/>
                </div>    
                <Footer/>            
            </div>
        )
    }
}