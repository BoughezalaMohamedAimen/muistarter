import { Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import CustomModal from '../../components/CustomModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import ChargeForm from '../../components/forms/ChargeForm';
import delete_from_server from "../../functions/crud/delete_from_server"
import urls from '../../components/urls';
import Filters from './Filters';
import get_from_server from "../../functions/crud/get_from_server"


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}



export default function Charges() {
  const charges=useSelector(state=>state.charges.charges)

  const dispatch=useDispatch()
  
  const today=new Date()


  const format_date=(dt)=>(`${dt.getFullYear()}-${dt.getMonth()+1 <=9 ? 0 : ""}${dt.getMonth()+1}-${dt.getDate() <=9 ? 0 : ""}${dt.getDate()}T${dt.getHours() <=9 ? 0 : ""}${dt.getHours()}:${dt.getMinutes() <=9 ? 0 : ""}${dt.getMinutes()}:${dt.getSeconds() <=9 ? 0 : ""}${dt.getSeconds()}Z`)

  console.log(format_date(today)+"++++++++++++++++++++")

  const [selected_charge, setselected_charge] = useState({id:0,date:format_date(today)})

  // const [selectionModel, setSelectionModel] = useState([]);
  const [modalvisible, setmodalvisible] = useState(false)
  const [confirmationmodal, setconfirmationmodal] = useState(false)
  const [selected, setselected] = useState([])
  const [action, setaction] = useState("");
  const [loading, setloading] = useState(false);


  const [min_date, setmin_date] = useState(new Date(today.getFullYear(), today.getMonth() - 1, 1))
  const [max_date, setmax_date] = useState(today)
  const [method, setmethod] = useState("")



  const retry=(url,params,type)=>{
    get_from_server(url,params)
    .then(res=>{
      dispatch({type,payload:res.data})
    })
    .catch(err=>{console.log(err);})
  }


  useEffect(() => {
     retry(urls.charges,{
      min_date,
      max_date,
      method
     },"SET_CHARGES")
  }, [ min_date,
       max_date,
       method
      ])
  




  const do_action=()=>{

    if(action=="delete")
    {
      setconfirmationmodal(true)
    }
  }

  const edit_item=(value)=>{
    setmodalvisible(true)
    setselected_charge(value.row)
  }
  const delete_items=()=>{
        setloading(true)
        delete_from_server(urls.charges+"/0/",{ids:selected})
        .then(res=>
          {
            dispatch({type:"REMOVE_CHARGE",payload:selected})
            setselected([])
            setloading(false)
          })
        .catch(err=>{console.log(err);setloading(false)})
  }

  return (
   <>
    <Typography variant='h3'>
      Liste des Charges
    </Typography>
    <div style={{ height: 400, width: '100%',marginTop:25 }}>

    <Grid container spacing={2}>
      <Grid item md={3} sx={{ marginBottom:2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(e)=>setaction(e.target.value)}
          >
            <MenuItem value="delete">Suprimmer</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={1} alignItems="center" justifyContent="center" display="flex" spacing={0}>
        <LoadingButton 
          variant='contained' loading={loading}
          onClick={do_action} 
        >
          Envoyer
        </LoadingButton>
      </Grid>
      <Grid item md={8} alignItems="center" justifyContent="flex-end" display="flex" spacing={0}>
          <Button variant='contained' color="neutral"
            onClick={()=>{setselected_charge({id:0,date:format_date(today)});setmodalvisible(true)}}
          >
            Ajouter un charge
          </Button>
      </Grid>

    </Grid>

    <Filters
      _filters={{
        min_date:{
          value:min_date,
          set:setmin_date
        },
        max_date:{
          value:max_date,
          set:setmax_date
        },
        method:{
          value:method,
          set:setmethod
        }
      }}
    />

      <DataGrid
        editMode="row"
        rows={charges}
        columns={[
          { field: 'id', headerName: 'ID', flex:1 },
          { field: 'date', headerName: 'Date', flex:1,
            renderCell: (params) => params.value.replace("T"," ").replace("Z",""),
          },
          { field: 'description', headerName: 'Description', flex:1 },
          { field: 'payment_method', headerName: 'methode de payment', flex:1 },
          {
            field: 'amount',
            headerName: 'montant',
            type: 'number',
            sortable: true,
          },
          {
            field: 'recipe',
            headerName: 'Image',
            width: 150,
            sortable: false,
            renderCell: (params) => <a href={urls.host+params.value} target="_blank"><img src={urls.host+params.value} style={{width:"100%",height:"100%"}}/></a>, // renderCell will render the component
          },
          {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (value, tableMeta, updateValue) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={()=>edit_item(value)}/>,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={()=>{setselected([value.id]);setconfirmationmodal(true)}}/>,
            ],
          },
        ]}
        components={{
          Toolbar: GridToolbar,
        }}
        // pageSize={5}
        rowsPerPageOptions={[5,25,50,100]}
        // onRowClick={(rowData, rowState) => {
        //   console.log(rowState);
        // }}
        onSelectionModelChange={(ids) => {
          setselected(ids);
        }}
        checkboxSelection
      />
    </div>

    <CustomModal anchor="bottom" visible={modalvisible} setvisible={setmodalvisible} >


            <Typography variant="h6" component="div" padding={3}>
              MODIFIER LA CHARGE
            </Typography>
            <ChargeForm selected_charge={selected_charge}  set_visible={setmodalvisible} />

    </CustomModal>

    <Dialog
        open={confirmationmodal}
        onClose={()=>setconfirmationmodal(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Confimer la supression
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Est de vous sur de bien vouloir suprimmer le charge ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setconfirmationmodal(false)}>
            Anuller
          </Button>
          <Button onClick={()=>{delete_items();setconfirmationmodal(false);}}>Suprimmer</Button>
        </DialogActions>
      </Dialog>

   </>
  )
}
