import { Button, TextField } from "@mui/material";
import { useState,useContext,useRef, useEffect } from 'react'
import { db } from '../firebase'
import { addDoc,collection,serverTimestamp } from '@firebase/firestore'
import { TodoContext } from '../TodoContext'

const TodoForm = () => {
    const inputAreaRef = useRef();
    const { showAlert, todo,setTodo } = useContext(TodoContext);
    const onSubmit = async () => {
        const colRef = collection(db, 'simpletodo');
        const docRef = await addDoc(colRef,{...todo,timestamp : 
        serverTimestamp()})
        showAlert('success',`todo with id ${docRef.id} has been added`);
        setTodo({title : '', details : ''});
        
    }

    useEffect(() => {
        const checkClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)) {
                console.log(`clicked outside input area`);
                setTodo({title : '', details : ''});
            } else {
                console.log(`inside input area`);
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
                value={todo.title}
                onChange={e => setTodo({...todo, title : e.target.value})}
                />
                <TextField fullWidth label="detail"
                multiline maxRows={4}
                value={todo.details}
                onChange={e => setTodo({...todo, details : e.target.value})}
                />
            </div>
            <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>Add new todo</Button>
        </>
    );
}
 
export default TodoForm;