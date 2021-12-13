import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';
import Editcustomer from './Editcustomer';

export default function Custlist (){


  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(result => result.json())
    .then(data => setCustomers(data.content))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')){
      fetch(link, {method: 'DELETE'})
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

  const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res=> fetchData())
    .catch(err => console.error(err))
  }

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstname'
    },
    {
      Header: 'Last Name',
      accessor: 'lastname'
    },
    {
      Header: 'Street Address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Post code',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'E-mail',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    { 
      accessor: 'links.0.href',
      Cell: (row) => <Button size="small" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>,
      filterable: false,
      sortable: false
    },
    { 
      accessor: 'links.0.href',
      Cell: (row) => <Editcustomer link={row.value} updateCustomer={updateCustomer} cust={row.original} />,
      filterable: false,
      sortable: false
    },
    {
      accessor: 'links.0.href',
      Cell: (row) => <Addtraining saveTraining={saveTraining} cust={row.value} />,
      filterable: false,
      sortable: false
    }
  ];



  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <ReactTable filterable={true} data={customers} columns={columns} /> 
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Customer deleted"
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