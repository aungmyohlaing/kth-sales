import axios from 'axios';

export default Service =>({
    newvoucher_save(object){
        try{
            let newvoucher = object;
            
            return axios.post('/api/newvoucher', newvoucher)
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

            return axios.put('/api/newvoucher/update/customer', customer)
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
            
            return axios.post('/api/returnitems', newvoucher)
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

            return axios.put('/api/returnitems/update/customer', customer)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }

    },
    getVocById(v) {
        try {
            let customer = { customerid: v }
            
            return axios.post('/api/dailycollection/getvouchers', customer)
                .then(res => {                    
                    return res.data;
                })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
})