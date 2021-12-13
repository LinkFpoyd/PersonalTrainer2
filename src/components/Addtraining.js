import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {

  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date:'', activity: '', duration: '', customer: ''
  })
 

  // comment for github testing purposes
  const handleClickOpen = () => {
    setTraining({date: '', activity: '', duration: '', customer: props.cust});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
  }

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  }

  return(
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              type="datetime-local"
              value={training.date}
              onChange={event => handleInputChange(event)}
              label="Date"
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={event => handleInputChange(event)}
              label="Activity"
              fullWidth
            />
            <TextField
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={event => handleInputChange(event)}
              label="Duration"
              fullWidth
            />
            <TextField
              margin="dense"
              name="customer"
              value={training.customer}
              onChange={event => handleInputChange(event)}
              label="Customer"
              fullWidth
            />
          </DialogContent>
        <DialogActions>
         <Button onClick={handleClose} color="primary">
           Cancel
         </Button>
         <Button onClick={addTraining} color="primary">
           Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}