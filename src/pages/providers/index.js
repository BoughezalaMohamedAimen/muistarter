import { Typography } from '@mui/material'
import React from 'react'
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
import ProviderForm from '../../components/forms/ProviderForm';
import delete_from_server from "../../functions/crud/delete_from_server"
import urls from '../../components/urls';



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



export default function Providers() {
  const providers=useSelector(state=>state.providers.providers)

  const dispatch=useDispatch()


  const [selected_provider, setselected_provider] = React.useState({id:0})

  // const [selectionModel, setSelectionModel] = React.useState([]);
  const [modalvisible, setmodalvisible] = React.useState(false)
  const [confirmationmodal, setconfirmationmodal] = React.useState(false)
  const [selected, setselected] = React.useState([])
  const [action, setaction] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const do_action=()=>{

    if(action=="delete")
    {
      setconfirmationmodal(true)
    }
  }

  const edit_item=(value)=>{
    setmodalvisible(true)
    setselected_provider(value.row)
  }
  const delete_items=()=>{
        setloading(true)
        delete_from_server(urls.providers+"/0/",{ids:selected})
        .then(res=>
          {
            dispatch({type:"REMOVE_PROVIDER",payload:selected})
            setselected([])
            setloading(false)
          })
        .catch(err=>{console.log(err);setloading(false)})
  }

  return (
   <>
    <Typography variant='h3'>
      Liste des Fournisseurs
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
            onClick={()=>{setselected_provider({id:0});setmodalvisible(true)}}
          >
            Ajouter un fournisseur
          </Button>
      </Grid>

    </Grid>



      <DataGrid
        editMode="row"
        rows={providers}
        columns={[
          { field: 'id', headerName: 'ID', flex:1 },
          { field: 'name', headerName: 'Nom', flex:1},
          { field: 'phone', headerName: 'Telephone', flex:1 },
          { field: 'email', headerName: 'E-mail', flex:1 },
          { field: 'adress', headerName: 'Adresse', flex:1 },
          {
            field: 'credit',
            headerName: 'Solde',
            type: 'number',
            sortable: true,
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
              MODIFIER LE FOURNISSEUR
            </Typography>
            <ProviderForm selected_provider={selected_provider}  set_visible={setmodalvisible} />

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
            Est de vous sur de bien vouloir suprimmer le fournisseur ? 
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
