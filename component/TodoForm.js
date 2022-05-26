import { Button, TextField } from "@mui/material";
import { useState,useContext,useRef, useEffect } from 'react'
import { db } from '../firebase'
import { addDoc,collection,serverTimestamp,doc, updateDoc, setDoc } from 'firebase/firestore'
import { TodoContext } from '../TodoContext'

const TodoForm = () => {
    const inputAreaRef = useRef();
    let { titleData,setTitleData, detailsData, setDetailsData, showAlert,update } = useContext(TodoContext);  
    const colRef = collection(db,'simpletodo');
    const handleSubmit = async () => {
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

    useEffect(() => {
        const checkClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)) {
                setTitleData('')
                setDetailsData('')
            }
        }
        document.addEventListener('mousedown',checkClickedOutside);
        return () => {
            document.removeEventListener('mousedown',checkClickedOutside);
        }
    },[])
    return (
        <>
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
                  <Button variant='contained' sx={{marginBlock: '10px'}}>
                      Update Todo
                  </Button>
              ):(
                <Button variant='contained'  sx={{marginBlock: '10px'}} onClick={handleSubmit}>
                    Add Todo
                </Button>
              )}
            </div>
            
        </>
    );
}
 
export default TodoForm;