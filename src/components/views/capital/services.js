import axios from 'axios';

export default service => ({
    get(){
        try {
            return axios.get('http://192.168.1.44:3001/api/customer').then(res =>{
                return res.data;
            })
        }
        catch(err){
            console.log(err);
            return null;
        }
    }
})
