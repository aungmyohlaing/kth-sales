import axios from 'axios';

export default service => ({
    get(){
        try {
            return axios.get('/api/customer').then(res =>{
                return res.data;
            })
        }
        catch(err){
            console.log(err);
            return null;
        }
    }
})
