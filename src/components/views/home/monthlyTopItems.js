import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Services from "../home/service";

export default class monthlyTopItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topItems: {
        itemno: [],
        itemname: [],
      },
    };
  }

  componentDidMount() {
    var self = this;
    var currentMonth = new Date().getMonth() + 1;

    if (self.props.type.toString().toLowerCase() === "selling") {
      /**
       * Load Top Selling Items
       */

      let newTopSellingState = Object.assign({}, self.state.topItems);
      Services()
        .getMonthlyTopSelling(currentMonth)
        .then((res) => {
          // this.setState({ currentMonthTotalSales: res[0].totalsales });
          for (var k = 0; k < res.length; k++) {
            newTopSellingState.itemno.push(res[k]._id.itemno);
            newTopSellingState.itemname.push(res[k]._id.itemname);
          }
          self.setState({ topItems: newTopSellingState });
        });
    } else {
      /**
       * Load Most Return Items
       */
      let newMostReturnState = Object.assign({}, self.state.topItems);
      Services()
        .getMonthlyMostReturnItems(currentMonth)
        .then((res) => {
          // this.setState({ currentMonthTotalSales: res[0].totalsales });
          for (var k = 0; k < res.length; k++) {
            newMostReturnState.itemno.push(res[k]._id.itemno);
            newMostReturnState.itemname.push(res[k]._id.itemname);
          }
          self.setState({ topItems: newMostReturnState });
        });
    }
  }

  render() {
    const { title } = this.props;
    const self = this;
    function CheckEmpty() {
      if (self.state.topItems.itemname.length > 0) {
        let topItem = "";
        topItem = self.state.topItems.itemname.map(function (item, index) {
          return (
            <div key={index}>
              {index + 1}. {item}
            </div>
          );
        });
        return topItem;
      } else {
        return <div>No Data</div>;
      }
    }
    return (
      <Row style={{ marginBottom: '15px' }}>
        <Col sm={12}>
          <Card>
            <Card.Header style={{ fontSize: '14px' }}>{title}</Card.Header>
            <Card.Body>
              <CheckEmpty />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
