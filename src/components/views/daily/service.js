import axios from 'axios';

export default Service =>({
    get() {
        try {
            return axios.get('/api/customer')
                .then(res => {
                    return res.data;
                })
        }
        catch (e) {
            return null;
        }

    },
    getById(v) {
        try {
            let customer = { customerid: v }
            
            return axios.post('/api/customer/getById', customer)
                .then(res => {                    
                    return res.data;
                })
        }
        catch (err) {
            console.log(err);
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
    save(object){
        try{
            let dailycollection = object;

            return axios.post('/api/dailycollection', dailycollection)
                .then(res => {                    
                    return res.data;
                })

        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    update_customer(object){
        let currentamount = object;
        try{
            return axios.put('/api/dailycollection/update/customer', currentamount)
                .then(res => {                    
                    return res.data;
                })
        }
        catch(err){
            console.log(err);
            return null;
        }
    }
});

