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
        if ( self.props.selectTo === 'voucherno'){
            if (prevprops.voudata !== self.props.voudata) {                
                var vocdata = self.props.voudata;
                let options = [];
    
                for (var i = 0; i <= vocdata.length - 1; i++) {
                    options.push({ value: vocdata[i]._id, label: vocdata[i]._id });
                }
                self.setState({ options: options });
            }
        } else if (self.props.selectTo === 'itemno'){
            if (prevprops.itemdata !== self.props.itemdata) {                
                var itemdata = self.props.itemdata;
                let options = [];
    
                for (var j = 0; j <= itemdata.length - 1; j++) {
                    options.push({ value: itemdata[j].itemno, label: itemdata[j].itemno });
                }
                self.setState({ options: options });
            }
        }
        

    }
}

