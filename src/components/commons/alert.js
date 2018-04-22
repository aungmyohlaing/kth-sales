import React from 'react';
import { Alert } from 'react-bootstrap';

export default class AlertComponent extends React.Component {
    render() {
        const {showAlert, onDismiss, alertStyle, alertMessage } = this.props;

        if (showAlert){            
            return (
                <div>
                    <Alert bsStyle={alertStyle} onDismiss={onDismiss}>
                        <h4>{alertMessage}</h4>                                        
                    </Alert>
                </div>
            )
        } else return null;
        
    }
}