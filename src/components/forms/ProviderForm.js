import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ProviderForm({provider}) {
    const regions=useSelector(state=>state.regions.regions)
  return (
    <>
        <Grid container spacing={5} padding={5}>
            <Grid item md={4}>
                <TextField variant='outlined' label="Nom" defaultValue={provider.name ?  provider.name : ""} fullWidth/>
            </Grid>
            <Grid item md={8}>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Telephone" defaultValue={provider.phone ?  provider.phone : ""} fullWidth/>
            </Grid>
            <Grid item md={4}>
                <TextField variant='outlined' label="Email" defaultValue={provider.email ?  provider.email : ""} fullWidth/>
            </Grid>
            <Grid item md={12}>
                <TextField variant='outlined' label="Adresse" defaultValue={provider.adress ?  provider.adress : ""} fullWidth/>
            </Grid>
            <Grid item md={4}>
                <FormControl fullWidth>
                    <InputLabel id="Wilaya-label">Wilaya</InputLabel>
                    <Select label="Wilaya" labelId="Wilaya-label" fullWidth>
                        <MenuItem value={0}> Selectionner une wilaya </MenuItem>
                        {
                            regions.map(wilaya=>(
                                <MenuItem> {wilaya.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4}>
                <FormControl fullWidth>
                    <InputLabel id="Commune-label">Commune</InputLabel>
                    <Select label="Commune" labelId="Commune-label" onChange={(e)=>console.log(e)} fullWidth>
                        <MenuItem value={0}> Selectionner une commune </MenuItem>
                        {   
                            regions.map(wilaya=>(
                                <MenuItem value={wilaya.id}> {wilaya.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={12} alignItems="flex-end" display={"flex"} justifyContent="flex-end">
                <TextField label="Solde" id="filled-basic"  variant="filled"  defaultValue={provider.credit ?  provider.credit : ""} />
                <Button variant='contained' sx={{mx:5}}>Valider</Button>
            </Grid>
        </Grid>
    </>
  )
}
