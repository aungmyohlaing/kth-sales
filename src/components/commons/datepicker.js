import React from 'react';
import CreateClass from 'create-react-class';
import { FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

var dateControl = CreateClass({

    render: function () {
        return <FormGroup>
           
                <DatePicker
                    selected={this.props.selected}
                    onChange={this.props.onChange.bind(this)}
                    dateFormat="MMMM dd, yyyy"
                    isClearable={true}
                    placeholderText="Select a Date"
                />
            
        </FormGroup>;
    }
});

export default dateControl;