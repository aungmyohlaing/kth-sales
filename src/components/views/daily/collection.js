import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import Header from '../../header';
import Footer from '../../footer';
import CollectionForm from '../daily/form';

export default class DailyCollection extends Component {
   
    
    render(){
        return (
            <div>
                <Header/>
                <div id="mainview" className="container">
                    <PageHeader>Collection <small>add daily collection</small></PageHeader>
                    <CollectionForm />
                </div>
                <Footer/>
            </div>
        )
    }
}