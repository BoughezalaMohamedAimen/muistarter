import React from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function Filters({_filters}) {

    const format_date=(dt)=>(`${dt.getFullYear()}-${dt.getMonth()+1 <=9 ? 0 : ""}${dt.getMonth()+1}-${dt.getDate() <=9 ? 0 : ""}${dt.getDate()}T${dt.getHours() <=9 ? 0 : ""}${dt.getHours()}:${dt.getMinutes() <=9 ? 0 : ""}${dt.getMinutes()}:${dt.getSeconds() <=9 ? 0 : ""}${dt.getSeconds()}Z`)

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container sx={{my:5}}>
                <Grid item md={3}>
                    <DesktopDatePicker
                        label="Date Minimum"
                        inputFormat="dd-MM-yyyy"
                        value={_filters.min_date.value}
                        onChange={(val)=>_filters.min_date.set(val)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item md={3}>
                    <DesktopDatePicker
                        label="Date Maximum"
                        inputFormat="dd-MM-yyyy"
                        value={_filters.max_date.value}
                        onChange={(val)=>_filters.max_date.set(val)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item md={3}>
                <FormControl fullWidth>
                    <InputLabel id="Method-label">Payment</InputLabel>
                    <Select label="Method" labelId="Method-label"
                      value={_filters.method.value} 
                      onChange={(e)=>_filters.method.set(e.target.value)} 
                      fullWidth>
                        <MenuItem value={0}> Selectionner une methode </MenuItem>
                                <MenuItem value={"especes"}> especes </MenuItem>
                                <MenuItem value={"cheque"}> cheque </MenuItem>
                                <MenuItem value={"cib"}> cib </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            </Grid>
        </LocalizationProvider>
    </>
  )
}
