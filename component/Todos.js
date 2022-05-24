import { collection, onSnapshot, orderBy, query, docs } from "firebase/firestore";
import { useState,useEffect } from "react";
import { db } from "../firebase";
import TodoList from "./TodoList";

const Todolist = () => {
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
    return (
        <div>
            {todos.map(todo => (
                <TodoList key={todo.id}
                id={todo.id}
                title = {todo.title} 
                details = {todo.details}
                timestamp = {todo.timestamp}
                />
            ))}
        </div>
    );
}
 
export default Todolist;