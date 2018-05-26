import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Modals = ({ show, title, bodytext, onNo, onYes  }) => (
    <div className="static-modal">
        <Modal show={show} onHide={onNo}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{bodytext}</Modal.Body>

            <Modal.Footer>
                <Button onClick={onNo}>No</Button>
                <Button bsStyle="primary" onClick={onYes}>Yes</Button>
            </Modal.Footer>
        </Modal>
    </div>
)

export default Modals;