import store from "../../store";

const get_to_server=(url,params)=>{
    return new Promise((resolve,reject)=>{
        const axios = require('axios');
        axios.defaults.timeout=4000;
        axios.defaults.timeoutErrorMessage='timeout'
        var sts=store.getState()
        axios({
            method:'get',
            url,
            headers: { 'authorization': `Token ${sts.auth.token}`},
            params
        })
        .then(response=>{
            // alert(response.data)
            if((response.status==200)||(response.status==201))
                resolve(response)
            else 
                reject(response)    
        })
        .catch(err=>{
            //  console.log(err.response.data ? err.response.data : "no data");
            // console.log("axios",err.message);
              reject(err);
            })
    })
}
export default get_to_server;