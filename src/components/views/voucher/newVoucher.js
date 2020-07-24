import React, {Component} from 'react';
import Header from '../../header';
import Footer from '../../footer';
import VoucherForm from './form';

export default class newVoucher extends Component{    
    render(){
        const {
            match: { params },
          } = this.props;
    //    console.log('Param', params)
        return (
            <div>
                <Header/>
                <div id="mainview" className="container">
                    <h2> Sales <small> add new voucher</small> </h2>
                    <hr/>
                    <VoucherForm formtype={'customers'} param={params}/>
                </div>    
                <Footer/>            
            </div>
        )
    }
}