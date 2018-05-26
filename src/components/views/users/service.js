import axios from 'axios';

export default service => ({
    get(v) {                
        try {
            return axios.get('/api/users').then(res => {
                return res.data;
            })
        }
        catch (e) {
            console.log('Error:', e);
            return null;
        }
    },
    getUsersNotEq(v) {                
        try {
            let userid = { id: v}
            return axios.post('/api/users/noteq', userid).then(res => {
                return res.data;
            })
        }
        catch (e) {
            console.log('Error:', e);
            return null;
        }
    },
    delete(v) {
        try {
            
            return axios.delete('/api/users', { data: { userid: v }})
                .then(res => {
                    return res.data;
                })

        }
        catch (e) {
            console.log('Error:', e);
            return null;
        }
    }

})