import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import userlogo from "../images/businessman.png";

export default class usercard extends Component {
  render() {
    const { dataList } = this.props;
    return dataList.map(function (item) {
      return (
        <Col
          key={item._id}
          xs={12}
          sm={6}
          md={3}
          lg={3}
          style={{ marginBottom: "15px" }}
        >
          <NavLink to={"/customer/detail/" + item._id} style={{ textDecoration: 'none' }}>
            {/* <div>
              <Image src={userlogo} className="cusmedia" thumbnail />
              <h4>{item.name}</h4>
              <p>Amount: {item.salesamount} Ks</p>
            </div> */}
            <Card className="cusmedia" bg="light" text="dark" >
              <Card.Img
                variant="top"
                src={userlogo}                
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Amount: {item.salesamount} MMK</Card.Text>                
              </Card.Body>
            </Card>
          </NavLink>
        </Col>
      );
    });
  }
}
