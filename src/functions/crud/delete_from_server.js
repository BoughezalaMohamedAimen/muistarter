import store from "../../store";

const delete_from_server=(url)=>{
    return new Promise((resolve,reject)=>{
        const axios = require('axios');
        axios.defaults.timeout=6000;
        var sts=store.getState()
        axios({
            method:'delete',
            url,
            headers: { 'authorization': `Token ${sts.auth.token}`},
        })
        .then(response=>{
            // alert(response.data)
            if((response.status==200)||(response.status==204))
                resolve(response)
            else 
                reject(response)    
        })
        .catch(err=>reject(err))
    })
}
export default delete_from_server;