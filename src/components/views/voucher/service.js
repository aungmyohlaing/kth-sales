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
    returnitem_update_voucher(object){
        try {
            let voucher = object;

            return axios.put('/api/returnitems/update/voucher', voucher)
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
            
            return axios.post('/api/returnitems/getvouchers', customer)
                .then(res => {                    
                    return res.data;
                })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    getItemByVoc(cumid,vocno) {
        try {
            let voucher = { customerid: cumid ,voucherno: vocno }
            
            return axios.post('/api/returnitems/getitems', voucher)
                .then(res => {                    
                    return res.data;
                })
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    getItemById(vno,ino) {
        try {
            let item = { voucherno: vno, itemno: ino }
            
            return axios.post('/api/returnitems/getitembyid', item)
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