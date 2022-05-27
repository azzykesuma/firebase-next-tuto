import { Container } from '@mui/material'
import { TodoContext } from '../TodoContext';
import {
  Snackbar,
  Alert,
  Paper,
  IconButton,
  Typography,
  Box,
  TextField,
  Button
} from '@mui/material'
import { useState,useEffect,useRef } from 'react'
// firestore
import {
  collection,
  query,
  doc,
  orderBy,
  onSnapshot,
  deleteDoc,
  addDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import {db} from '../firebase'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const inputAreaRef = useRef();
  const [alert,setAlert] = useState('success');
  const [message,setMessage] = useState('');
  const [open,setOpen] = useState(false);
  const [ID,setID] = useState('')
  const [titleData,setTitleData] = useState('')
  const [detailsData,setDetailsData] = useState('')
  const [update,setUpdate] = useState(false)

  // create data
  const handleSubmit = async () => {
    const colRef = collection(db,'simpletodo');
    addDoc(colRef, {
        titleData,
        detailsData,
        timestamp : serverTimestamp(),
    }
    ) .then(() => {
        setTitleData('')
        setDetailsData('')
        showAlert('success', 'todo has been added')
    }) .catch(err => {
        console.log(err.message);
    })
  }

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

      const checkClickedOutside = e => {
        if(!inputAreaRef.current.contains(e.target)) {
            setTitleData('')
            setDetailsData('')
            setUpdate(false)
          }
        }
        document.addEventListener('mousedown',checkClickedOutside);
        return () => {
            document.removeEventListener('mousedown',checkClickedOutside);
            unsub
        }
  },[])

  // update data
  const getID = (id,title,details) => {
    setID(id)
    setTitleData(title)
    setDetailsData(details)
    setUpdate(true)
  }

  const handleUpdate = () => {
    let editData = doc(db,"simpletodo",ID);
    updateDoc(editData, {
        titleData,
        detailsData,
        timestamp : serverTimestamp(),
    }).then(() => {
      showAlert('success', 'todo has been updated')
      setTitleData('')
      setDetailsData('')
    }).catch(err => {
      console.log(err.message);
    })
  }

  // delete data
  const deleteTodo = async(id,e) => {
    e.stopPropagation();
    const docRef = doc(db,'simpletodo',id)
    await deleteDoc(docRef)
    showAlert('error',`todo with id ${id} has been deleted`)
  }


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
        <div ref={inputAreaRef}>
          <TextField
          fullWidth label="title" margin="normal"
          value={titleData}
          onChange={e => setTitleData(e.target.value)}
          />
          <TextField fullWidth label="detail"
          multiline maxRows={4}
          value={detailsData}
          onChange={e => setDetailsData(e.target.value)}
          />

        {update ? (
            <Button variant='contained' sx={{marginBlock: '10px'}} onClick={handleUpdate}>
                Update Todo
            </Button>
        ):(
          <Button variant='contained'  sx={{marginBlock: '10px'}} onClick={handleSubmit}>
              Add Todo
          </Button>
        )}
        </div>
        <Snackbar
        anchorOrigin={{vertical : 'bottom', horizontal : 'center'}}
        open={open} autoHideDuration={3000} onClose={handleClose}
        >
          <Alert severity={alert}>{message}</Alert>
        </Snackbar>
        {todos.map(todo => (
          <div key={todo.id}>
            <Paper sx={{
              display: 'flex',
              alignItems: 'center',
              marginBlock: 2,
              padding : '5px'
            }}
            onClick={() => getID(todo.id,todo.titleData,todo.detailsData)}>
              <Box sx={{flexGrow : 1}}>
                <Typography variant='h5' component='h2'>{todo.titleData}</Typography>
                <Typography variant='body2' component='h3'>{todo.detailsData}</Typography>
              </Box>
              <IconButton onClick={e => deleteTodo(todo.id,e)}><DeleteIcon /></IconButton>
            </Paper>
          </div>
        ))}
      </Container>
    </TodoContext.Provider>
  )
}
