import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Services from "./service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default class averageByPeriod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAverage: "",
      lastAverage: "",
    };
  }

  componentDidMount() {
    var self = this;
    if (self.props.averageby.toString().toLowerCase() === "month") {
      /**
       * Load Total current month Sales
       */
      let currentMonth = new Date().getMonth() + 1;
      Services()
        .getMonthlyTotalSales(currentMonth)
        .then((res) => {
          if (res.length === 0) this.setState({ currentAverage: 0 });
          else this.setState({ currentAverage: res[0].totalsales });
        });

      /**
       * Load Total Last month Sales
       */
      let lastMonth = new Date().getMonth();
      Services()
        .getMonthlyTotalSales(lastMonth)
        .then((res) => {
          if (res.length === 0) this.setState({ lastAverage: 0 });
          else this.setState({ lastAverage: res[0].totalsales });
        });
    } else {
      /**
       * Load Total current Year Sales
       */
      let currentYear = new Date().getFullYear();
      Services()
        .getYearlyTotalSales(currentYear)
        .then((res) => {
          if (res.length === 0) this.setState({ currentAverage: 0 });
          else this.setState({ currentAverage: res[0].totalsales });
        });

      /**
       * Load Total last Year Sales
       */
      let lastYear = new Date().getFullYear() - 1;
      Services()
        .getYearlyTotalSales(lastYear)
        .then((res) => {
          // console.log("Yearly Total Sales", res)
          if (res.length === 0) {
            this.setState({ lastAverage: 0 });
          } else this.setState({ lastAverage: res[0].totalsales });
        });
    }
  }

  render() {
    var self = this;
    const { title, description } = this.props;
    function CompareTotal() {
      if (self.state.currentAverage > self.state.lastAverage) {
        return (
          <h2>
            <FontAwesomeIcon icon={faCaretUp} className="top-arrow" />{" "}
            {self.state.currentAverage} Ks
          </h2>
        );
      } else {
        return (
          <h2>
            <FontAwesomeIcon icon={faCaretDown} className="bottom-arrow" />{" "}
            {self.state.currentAverage} Ks
          </h2>
        );
      }
    }
    return (
      <Row style={{ marginBottom: '15px' }}>
        <Col sm={12}>          
          <Card border={
              self.state.currentAverage > self.state.lastAverage
                ? "success"
                : "danger"
            }>
            <Card.Header style={{ fontSize: '14px' }}>{title}</Card.Header>
            <Card.Body>
              
                <CompareTotal />
              
              <Card.Text>
                <span style={{ fontSize:'12px' }}>{description} {self.state.lastAverage} MMK</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
