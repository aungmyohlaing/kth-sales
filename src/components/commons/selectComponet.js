import React from 'react';
import Select from 'react-select';
import Service from '../views/customers/service';

export default class SelectComponet extends React.Component {
    state = {
        options: [{
            value: '',
            label: ''
        }]
    }

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     //console.log(`Selected: ${selectedOption.value}`);
    // }

    componentWillMount() {
        var self = this;

        if (self.props.selectTo.toString().toLowerCase() === 'customers') {
            Service().get().then(res => {
                let options = [];

                for (var i = 0; i <= res.length - 1; i++) {
                    options.push({ value: res[i]._id, label: res[i].name });
                }
                self.setState({ options: options });
            });
        }
        else if (self.props.selectTo.toString().toLowerCase() === 'return-customers') {
            Service().getReturnCustomer().then(res => {
                let options = [];
                
                for (var i = 0; i <= res.length - 1; i++) {
                    options.push({ value: res[i]._id, label: res[i].name });
                }
                self.setState({ options: options });
            });
        }
        
    }

    render() {
        const { selectedOptions, selectedHandleChange, placeHolder } = this.props;
        const value = selectedOptions && selectedOptions.value;

        return (

            <Select
                name="form-field-name"
                className="form-control form-control-react-select"
                value={value}
                onChange={selectedHandleChange}
                options={this.state.options}
                clearable={false}
                placeholder={placeHolder}                
            />
        )
    }
    
    componentDidUpdate(prevprops) {
        var self = this;               
        if (prevprops.voudata !== self.props.voudata) {
            console.log('This Props', self.props.voudata);
            var vocdata = self.props.voudata;
            let options = [];

            for (var i = 0; i <= vocdata.length - 1; i++) {
                options.push({ value: vocdata[i].voucherno, label: vocdata[i].voucherno });
            }
            self.setState({ options: options });
        }

    }
}

