import axios from 'axios';

export default Service =>({
    get() {
        try {
            return axios.get('http://192.168.1.44:3001/api/customer')
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
            
            return axios.post('http://192.168.1.44:3001/api/customer/getById', customer)
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

            return axios.post('http://192.168.1.44:3001/api/dailycollection', dailycollection)
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
            return axios.put('http://192.168.1.44:3001/api/dailycollection/update/customer', currentamount)
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

