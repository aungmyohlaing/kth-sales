import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Modals = ({ show, title, bodyText, onNo, onYes  }) => (
    <div className="static-modal">
        <Modal show={show} onHide={onNo}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div style={{ fontWeight: '300' }}>{bodyText[0].heading}</div>
            <div style={{ fontWeight: '300' }}>{bodyText[0].bodyText}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onNo}>No</Button>
                <Button variant="light" onClick={onYes}>Yes</Button>
            </Modal.Footer>
        </Modal>
    </div>
)

export default Modals;