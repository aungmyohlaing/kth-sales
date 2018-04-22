import axios from 'axios';

export default Service =>({
    newvoucher_save(object){
        try{
            let newvoucher = object;
            
            return axios.post('http://192.168.1.44:3001/api/newvoucher', newvoucher)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null
        }
    },
    newvoucher_update_customer(object){
        try {
            let customer = object;

            return axios.put('http://192.168.1.44:3001/api/newvoucher/update/customer', customer)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }

    },
    returnitem_save(object){
        try{
            let newvoucher = object;
            
            return axios.post('http://192.168.1.44:3001/api/returnitems', newvoucher)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null
        }
    },
    returnitem_update_customer(object){
        try {
            let customer = object;

            return axios.put('http://192.168.1.44:3001/api/returnitems/update/customer', customer)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }

    }
})