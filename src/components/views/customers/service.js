import axios from 'axios';

export default service => ({
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
    getDailyCollection(v){
        try {
            let customer = {customerid: v}
            
            return axios.post('/api/customer/getdaily', customer)
            .then(res => {                
                return res.data;
            })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    getNewVouchers(v){
        try {
            let customer = {customerid: v}
            
            return axios.post('/api/customer/getnewvoucher', customer)
            .then(res => {                
                return res.data;
            })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    getReturnItems(v){
        try {
            let customer = {customerid: v}
            
            return axios.post('/api/customer/getreturnitem', customer)
            .then(res => {                
                return res.data;
            })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
})