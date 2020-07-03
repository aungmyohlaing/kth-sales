import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <Navbar id="footer" bg="info" variant="info" sticky="bottom">
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text className="text-center" style={{ color: "white" }}>
            &copy; Copyright 2020 KTH
            <br />
            Icons made by{" "}
            <a
              style={{ color: "white" }}
              href="https://www.flaticon.com/authors/popcorns-arts"
              title="Icon Pond"
              rel="noopener noreferrer"
              target="_blank"
            >
              Icon Pond
            </a>{" "}
            from{" "}
            <a
              style={{ color: "white" }}
              href="https://www.flaticon.com/"
              title="Flaticon"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.flaticon.com
            </a>{" "}
            is licensed by{" "}
            <a
              style={{ color: "white" }}
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC 3.0 BY
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
