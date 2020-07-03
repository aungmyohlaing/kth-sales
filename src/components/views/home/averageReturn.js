import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Services from "./service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default class averageReturnByPeriod extends Component {
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
       * Load Total current month Return
       */
      let currentMonthReturn = new Date().getMonth() + 1;
      Services()
        .getMonthlyTotalReturn(currentMonthReturn)
        .then((res) => {
          if (res.length === 0) {
            this.setState({ currentAverage: 0 });
          } else this.setState({ currentAverage: res[0].totalreturn });
        });

      /**
       * Load Total Last Month Return
       */

      let lastMonthReturn = new Date().getMonth();
      Services()
        .getMonthlyTotalReturn(lastMonthReturn)
        .then((res) => {
          if (res.length === 0) {
            this.setState({ lastAverage: 0 });
          } else this.setState({ lastAverage: res[0].totalreturn });
        });
    } else {
      /**
       * Load Total current Year Return
       */
      let currentYearReturn = new Date().getFullYear();
      Services()
        .getYearlyTotalReturn(currentYearReturn)
        .then((res) => {
          if (res.length === 0) this.setState({ currentAverage: 0 });
          else this.setState({ currentAverage: res[0].totalreturn });
        });

      /**
       * Load Total last Year Return
       */

      let lastYearReturn = new Date().getFullYear() - 1;
      Services()
        .getYearlyTotalReturn(lastYearReturn)
        .then((res) => {
          if (res.length === 0) {
            this.setState({ lastAverage: 0 });
          } else this.setState({ lastAverage: res[0].totalreturn });
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
            <FontAwesomeIcon icon={faCaretUp} className="top-arrow-return" />
            {self.state.currentAverage} MMK
          </h2>
        );
      } else {
        return (
          <h2>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="bottom-arrow-return"
            />{" "}
            {self.state.currentAverage} MMK
          </h2>
        );
      }
    }
    return (
      <Row style={{ marginBottom: '15px' }}>
        <Col sm={12}>
          <Card
            border={
              self.state.currentAverage > self.state.lastAverage
                ? "danger"
                : "success"
            }
          >
            <Card.Header style={{ fontSize: '14px' }}>{title}</Card.Header>
            <Card.Body>
              <CompareTotal />

              <Card.Text>
                <span style={{ fontSize: "12px" }}>
                  {description} {self.state.lastAverage} MMK
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    );
  }
}
