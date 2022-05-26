import { Container } from '@mui/material'
import TodoForm from '../component/TodoForm'
import { TodoContext } from '../TodoContext';
import {
  Snackbar,
  Alert
} from '@mui/material'
import { useState,useEffect } from 'react'
// firestore
import {
  collection,
  query,
  doc,
  orderBy,
  onSnapshot,
  querySnapshot
} from 'firebase/firestore'
import {db} from '../firebase'

export default function Home() {
  const [alert,setAlert] = useState('success');
  const [message,setMessage] = useState('');
  const [open,setOpen] = useState(false);
  const [titleData,setTitleData] = useState('')
  const [detailsData,setDetailsData] = useState('')
  const [update,setUpdate] = useState(false)

  // create data

  // read data
  const [todos,setTodos] = useState([]);
  useEffect(() => {
      const colRef = collection(db,"simpletodo");
      const q = query(colRef,orderBy('timestamp','desc'));
      const unsub = onSnapshot(q,(querySnapshot) => {
          setTodos(querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id : doc.id,
              timestamp : doc.data().timestamp?.toDate().getTime()
          })))
      });
      return unsub
  },[])

  // update data
  

  // delete data
  


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
    <TodoContext.Provider value={{
      showAlert,titleData,detailsData,
      setTitleData,setDetailsData,update,setUpdate
      }}>
      <Container maxWidth="sm">
        <TodoForm />
        <Snackbar
        anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
        open={open} autoHideDuration={3000} onClose={handleClose}
        >
          <Alert severity={alert}>{message}</Alert>
        </Snackbar>
      </Container>
    </TodoContext.Provider>
  )
}
