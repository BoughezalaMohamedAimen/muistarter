import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import put_to_server from '../../functions/crud/put_to_server';
import post_to_server from '../../functions/crud/post_to_server';
import urls from '../urls';

export default function ProviderForm({selected_provider,set_visible}) {

    const dispatch=useDispatch()

    const regions=useSelector(state=>state.regions.regions)


    const [provider, setprovider] = useState(selected_provider)
    const [selected_wilaya, setselected_wilaya] = useState(regions.find(wilaya=>wilaya.id==selected_provider.wilaya) ? regions.find(wilaya=>wilaya.id==selected_provider.wilaya) : {id:0,communes_list:[]})


    const [is_sending, setis_sending] = useState(false)

    
    const send_provider=()=>{
        console.log(provider)
        setis_sending(true)
        provider.id!=0 ? 
        put_to_server(urls.providers+"/"+provider.id+"/",provider)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"UPDATE_PROVIDER",payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            setis_sending(false)
        })
        :
        post_to_server(urls.providers+"/",provider)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"ADD_PROVIDER",payload:res.data})
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
                defaultValue={provider.name ?  provider.name : ""}
                onKeyUp={(e)=>setprovider({...provider,name:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={8}>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Telephone" 
                defaultValue={provider.phone ?  provider.phone : ""}
                onKeyUp={(e)=>setprovider({...provider,phone:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Email" 
                defaultValue={provider.email ?  provider.email : ""}
                onKeyUp={(e)=>setprovider({...provider,email:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={12}>
                <TextField variant='outlined' label="Adresse" 
                defaultValue={provider.adress ?  provider.adress : ""}
                onKeyUp={(e)=>setprovider({...provider,adress:e.target.value})}
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
                        value={provider.commune} 
                        onChange={(e)=>setprovider({...provider,commune:e.target.value})} 
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
                    onKeyUp={(e)=>setprovider({...provider,credit:e.target.value})}
                    defaultValue={provider.credit ?  provider.credit : ""} />
                <LoadingButton variant='contained' sx={{mx:5}} loading={is_sending} onClick={send_provider}>Valider</LoadingButton>
            </Grid>
        </Grid>
    </>
  )
}
