import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { TodoContext } from "../TodoContext";

const TodoList = ({id,timestamp,title,details}) => {
    const { showAlert,setTodo } = useContext(TodoContext);
    const deleteTodo = async(id,e) => {
        e.stopPropagation();
        const docRef = doc(db,'simpletodo',id)
        await deleteDoc(docRef)
        showAlert('error',`todo with id ${id} has been deleted`)
    }
    return (
        <ListItem
        onClick={() => setTodo({title,details,id,timestamp})}
        sx={{
            mt: 2,
            boxShadow: 3 ,    
        }}
        style={{backgroundColor: '#fafafa'}}
        secondaryAction={
            <>
                <IconButton onClick={e => deleteTodo(id,e)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </>
        }
        >
            <ListItemText
            primary={title}
            secondary={moment(timestamp).format('MMMM Do YYYY')}
            />
        </ListItem>
    );
}
 
export default TodoList;