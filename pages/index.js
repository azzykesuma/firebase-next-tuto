import { Container } from '@mui/material'
import Todolist from '../component/Todos'
import TodoForm from '../component/TodoForm'
import { TodoContext } from '../TodoContext';
import {
  Snackbar,
  Alert
} from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [alert,setAlert] = useState('success');
  const [message,setMessage] = useState('');
  const [open,setOpen] = useState(false);
  const [todo,setTodo] = useState({title : '', details : ''});

  const showAlert = (type,msg) => {
    setAlert(type)
    setMessage(msg)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{showAlert,todo,setTodo}}>
      <Container maxWidth="sm">
        <TodoForm />
        <Snackbar
        anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
        open={open} autoHideDuration={3000} onClose={handleClose}
        >
          <Alert severity={alert}>{message}</Alert>
        </Snackbar>
        <Todolist />
      </Container>
    </TodoContext.Provider>
  )
}
