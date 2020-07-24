import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => (
  <div className="modal-backdrop" style={{ opacity: '0.5' }}>
    <div style={{ position:'absolute', top: '50%', left: '50%' }}>
      <Spinner animation="grow" variant="info" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  </div>
);

export default Loading;
