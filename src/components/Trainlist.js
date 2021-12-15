import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

export default function Trainlist (){

  const [trains, setTrains] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(result => result.json())
    .then(data => setTrains(data))
    console.log(trains);
  }

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')){
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
      .then(res => fetchData())
      .catch(err => console.error(err))
      setOpen(true);
      } 
  }

  const handleClose = (event, reason) => {
    setOpen(false);
    if (reason === 'clickaway') {
      return;
    }
  }

  const columns = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (props)=>{
        return moment(props.value).format('DD/MM/YYYY HH:mm')
      }
    },
    {
      Header: 'Duration (min)',
      accessor: 'duration'
    },
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: 'Customer ID',
      accessor: 'customer.id'
    },
    {
      Header: 'First Name',
      accessor: 'customer.firstname'
    },
    {
      Header: 'Last Name',
      accessor: 'customer.lastname'
    },
    {
      accessor: 'id',
      Cell: (row) => <Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>,
      filterable: false,
      sortable: false
    }
  ];



  return (
    <div>
      <ReactTable filterable={true} sortable={true} data={trains} columns={columns} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Training deleted"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )

}

