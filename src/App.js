import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { 
  addDoc, 
  collection, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

import { db } from './firebase';
import { Todo } from './components/Todo';

import './App.css';

function App() {
  const [todos, setTodos] = useState([
    "Create Blockchain App",
    "Create a Youtube Tutorial"
  ]);
  const [input, setInput] = useState('');

  function addTodo(e){
    e.preventDefault();
    addDoc(collection(db,'todos'),{
      todo: input,
      timestamp: serverTimestamp(),
    })
    setInput('');
  }

  useEffect(() => {
    onSnapshot(collection(db,'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc =>{
        return{
          id: doc.id,
          ... doc.data(),
        }
      }));
    });
    console.log('todos', todos);
  },[input]);

  return (
    <div className="App">
      <h2>TODO List App</h2>
      <form>
        <TextField 
          id="outlined-basic" 
          label="Make Todo" 
          variant="outlined" 
          style={{margin:"0px 5px"}} 
          size="small" 
          value={input}
          onChange={e=> setInput(e.target.value)}
        />
        <Button variant='contained'
        color='primary'
        onClick={addTodo}
        >
          Todo
        </Button>
      </form>
      <ul>
        {todos.map(item => <Todo key={item.id} data={item}/>)}
      </ul>
    </div>
  );
}

export default App;
