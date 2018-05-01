import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import userlogo from '../images/businessman.png';

export default class usercard extends Component {

    render() {
        const { dataList } = this.props;
        return(
            dataList.map(function (item) {
                return (
                    <Col key={item._id} xs={12} sm={6} md={2} lg={2}>
                        <NavLink to={'/customer/detail/' + item._id}>
                            <Thumbnail src={userlogo} className="cusmedia" alt="242x200">
                                <h4>{item.name}</h4>
                                <p>Amount: {item.salesamount} Ks</p>
                            </Thumbnail>
                        </NavLink>
                    </Col>
                )
            })
        )
        
    }
}