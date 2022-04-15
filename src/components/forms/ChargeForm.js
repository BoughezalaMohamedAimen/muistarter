import React, {useState} from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FilledInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Provider, useDispatch, useSelector } from 'react-redux'
import put_to_server from '../../functions/crud/put_to_server';
import post_to_server from '../../functions/crud/post_to_server';
import urls from '../urls';

export default function ChargeForm({selected_charge,set_visible}) {

    const dispatch=useDispatch()



    const [charge, setcharge] = useState(selected_charge)


    const [is_sending, setis_sending] = useState(false)

    


    const isFile = input => 'File' in window && input instanceof File;






    const send_charge=()=>{
        console.log(charge)

        const formData = new FormData();

        formData.append("date", charge.date);
        formData.append("payment_method", charge.payment_method);
        formData.append("amount", charge.amount);
        formData.append("description", charge.description);
        
        if(isFile(charge.recipe))
        formData.append("recipe", charge.recipe) 


        setis_sending(true)
        charge.id!=0 ? 
        put_to_server(urls.charges+"/"+charge.id+"/",formData)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"UPDATE_CHARGE",payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            setis_sending(false)
        })
        :
        post_to_server(urls.charges+"/",formData)
        .then(res=>{
            console.log(res);
            setis_sending(false)
            set_visible(false)
            dispatch({type:"ADD_CHARGE",payload:res.data})
        })
        .catch(err=>{
            console.log(err);
            setis_sending(false)
        })

    }

    const format_date=(dt)=>(`${dt.getFullYear()}-${dt.getMonth()+1 <=9 ? 0 : ""}${dt.getMonth()+1}-${dt.getDate() <=9 ? 0 : ""}${dt.getDate()}T${dt.getHours() <=9 ? 0 : ""}${dt.getHours()}:${dt.getMinutes() <=9 ? 0 : ""}${dt.getMinutes()}:${dt.getSeconds() <=9 ? 0 : ""}${dt.getSeconds()}Z`)

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={5} padding={5}>
            <Grid item md={4}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="dd-MM-yyyy"
                    value={new Date(
                        charge.date.split("-")[0],charge.date.split("-")[1]-1,charge.date.split("T")[0].split("-")[2],
                        charge.date.split("T")[1].split(":")[0], charge.date.split("T")[1].split(":")[1], charge.date.split("T")[1].split(":")[2].slice(0, -1))
                    }
                    onChange={(val)=>setcharge({...charge,date:format_date(val)})}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item md={4}>
            <TimePicker
                label="Heure"
                inputFormat="hh:mm:ss"
                value={new Date(
                    charge.date.split("-")[0],charge.date.split("-")[1]-1,charge.date.split("T")[0].split("-")[2],
                    charge.date.split("T")[1].split(":")[0], charge.date.split("T")[1].split(":")[1], charge.date.split("T")[1].split(":")[2].slice(0, -1))}
                onChange={(val)=>setcharge({...charge,date:format_date(val)})}
                renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item md={12}>
                <TextField variant='outlined' label="Description" 
                defaultValue={charge.description ?  charge.description : ""}
                onKeyUp={(e)=>setcharge({...charge,description:e.target.value})}
                fullWidth/>
            </Grid>
            <Grid item md={4}>
                <FormControl fullWidth>
                    <InputLabel id="Method-label">Payment</InputLabel>
                    <Select label="Method" labelId="Method-label"
                      value={charge.payment_method} 
                      onChange={(e)=>setcharge({...charge,payment_method:e.target.value})} 
                      fullWidth>
                        <MenuItem value={0}> Selectionner une methode </MenuItem>
                                <MenuItem value={"especes"}> especes </MenuItem>
                                <MenuItem value={"cheque"}> cheque </MenuItem>
                                <MenuItem value={"cib"}> cib </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4}>
                Image:
                <input
                type="file"
                placeholder={charge.recipe}
                onChange={(e) => setcharge({...charge,recipe:e.target.files[0]})}
                />
            </Grid>
            <Grid item md={12} alignItems="flex-end" display={"flex"} justifyContent="flex-end">
                <TextField label="Montant" id="filled-basic"  variant="filled"  
                    onKeyUp={(e)=>setcharge({...charge,amount:e.target.value})}
                    defaultValue={charge.amount ?  charge.amount : ""} />
                <LoadingButton variant='contained' sx={{mx:5}} loading={is_sending} onClick={send_charge}>Valider</LoadingButton>
            </Grid>
        </Grid>
      </LocalizationProvider>  
    </>
  )
}
