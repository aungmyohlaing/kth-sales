import axios from 'axios';

export default Service => ({
    getTopTen() {
        try {

            return axios.get('/api/home/topten')
                .then(res => {
                    return res.data;
                })

        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getThisYearChart(v) {
        try {
            let fullyear = { fullyear: v };          
            return axios.post('/api/charts/thisyear', fullyear)
                .then(res => {                    
                    return res.data;
                })

        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getYearlyTotalSales(v){
        try {
            let currentyear = { currentyear: v };
            return axios.post('/api/home/yearly/totalsales', currentyear)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    getMonthlyTotalSales(v){
        try{
            let currentmonth = { currentmonth: v };
            return axios.post('/api/home/monthly/totalsales', currentmonth)
            .then(res => {
                return res.data;
            })

        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    getMonthlyTopSelling(v){
        try {
            let currentmonth = { currentmonth: v };
            return axios.post('/api/home/topselling', currentmonth)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    getMonthlyTotalReturn(v){
        try {
            let currentmonth = { currentmonth: v };
            return axios.post('/api/home/monthly/totalreturn', currentmonth)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    getYearlyTotalReturn(v){
        try {
            let currentyear = { currentyear: v };
            return axios.post('/api/home/yearly/totalreturn', currentyear)
            .then(res => {
                return res.data;
            })
        }
        catch(e){
            console.log(e);
            return null;
        }
    },
    getThisYearReturnChart(v) {
        try {
            let fullyear = { fullyear: v };          
            return axios.post('/api/return/charts/thisyear', fullyear)
                .then(res => {                    
                    return res.data;
                })

        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
    getMonthlyMostReturnItems(v){
        try {
            let currentmonth = { currentmonth: v };
            return axios.post('/api/home/mostreturn', currentmonth)
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