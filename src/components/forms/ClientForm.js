import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import put_to_server from '../../functions/crud/put_to_server';
import post_to_server from '../../functions/crud/post_to_server';
import urls from '../urls';

export default function ClientForm({selected_client,set_visible}) {

    const dispatch=useDispatch()

    const regions=useSelector(state=>state.regions.regions)


    const [client, setclient] = useState(selected_client)
    const [selected_wilaya, setselected_wilaya] = useState(regions.find(wilaya=>wilaya.id==selected_client.wilaya) ? regions.find(wilaya=>wilaya.id==selected_client.wilaya) : {id:0,communes_list:[]})


    const [is_sending, setis_sending] = useState(false)

    
    const send_client=()=>{
        console.log(client)
        setis_sending(true)
        client.id!=0 ? 
        put_to_server(urls.clients+"/"+client.id+"/",client)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"UPDATE_CLIENT",payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            setis_sending(false)
        })
        :
        post_to_server(urls.clients+"/",client)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"ADD_CLIENT",payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            setis_sending(false)
        })

    }


  return (
    <>
        <Grid container spacing={5} padding={5}>
            <Grid item md={4}>
                <TextField variant='outlined' label="Nom" 
                defaultValue={client.name ?  client.name : ""}
                onKeyUp={(e)=>setclient({...client,name:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={8}>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Telephone" 
                defaultValue={client.phone ?  client.phone : ""}
                onKeyUp={(e)=>setclient({...client,phone:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Email" 
                defaultValue={client.email ?  client.email : ""}
                onKeyUp={(e)=>setclient({...client,email:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={12}>
                <TextField variant='outlined' label="Adresse" 
                defaultValue={client.adress ?  client.adress : ""}
                onKeyUp={(e)=>setclient({...client,adress:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={4}>
                <FormControl fullWidth>
                    <InputLabel id="Wilaya-label">Wilaya</InputLabel>
                    <Select label="Wilaya" labelId="Wilaya-label"
                      value={selected_wilaya.id} 
                      onChange={(e)=>setselected_wilaya(regions.filter(wilaya=>wilaya.id==e.target.value)[0])} 
                      fullWidth>
                        <MenuItem value={0}> Selectionner une wilaya </MenuItem>
                        {
                            regions.map(wilaya=>(
                                <MenuItem value={wilaya.id}> {wilaya.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4}>
                <FormControl fullWidth>
                    <InputLabel id="Commune-label">Commune</InputLabel>
                    <Select label="Commune" labelId="Commune-label" 
                        value={client.commune} 
                        onChange={(e)=>setclient({...client,commune:e.target.value})} 
                        fullWidth>
                        <MenuItem value={0}> Selectionner une commune </MenuItem>
                        {   
                            selected_wilaya.communes_list.map(commune=>(
                                <MenuItem value={commune.id}> {commune.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={12} alignItems="flex-end" display={"flex"} justifyContent="flex-end">
                <TextField label="Solde" id="filled-basic"  variant="filled"  
                    onKeyUp={(e)=>setclient({...client,credit:e.target.value})}
                    defaultValue={client.credit ?  client.credit : ""} />
                <LoadingButton variant='contained' sx={{mx:5}} loading={is_sending} onClick={send_client}>Valider</LoadingButton>
            </Grid>
        </Grid>
    </>
  )
}
