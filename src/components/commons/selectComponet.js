import React from 'react';
import Select from 'react-select';
import Service from '../views/customers/service';

export default class SelectComponet extends React.Component {

    componentDidMount() {
        Service().get().then(res => {
            let options = [];
            
            for (var i = 0; i <= res.length -1; i++) {
                options.push({ value: res[i]._id, label: res[i].name });
            }            
            this.setState({ options: options });
            this.setState({ customers: res });
        })
    }

    state = {
        // selectedOption: '',
        customers: [
            {
                _id: '',
                name: '',
                email: '',
                mobile: '',
                phone: '',
                currentamount: '',
                salesamount: '',
                address1: '',
                address2: ''
            }
        ],
        options: [{
            value: '',
            label: ''
        }]
    }

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     //console.log(`Selected: ${selectedOption.value}`);
    // }

    render() {
        const { selectedOptions, selectedHandleChange } = this.props;
        const value = selectedOptions && selectedOptions.value;
        
        return (

            <Select
                name="form-field-name"
                className="form-control form-control-react-select"
                value={value}
                onChange={selectedHandleChange}
                options={this.state.options}
                clearable={false}
                placeholder="Select a customer"
            />
        )
    }
}

