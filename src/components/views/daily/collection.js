import React, { Component } from "react";
import Header from "../../header";
import Footer from "../../footer";
import CollectionForm from "../daily/form";

export default class DailyCollection extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id="mainview" className="container">
          <h2>
            Collection <small>add daily collection</small>
          </h2>
          <hr />
          <CollectionForm />
        </div>
        
          <Footer />
       
      </div>
    );
  }
}
