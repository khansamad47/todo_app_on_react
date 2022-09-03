import logo from './logo.svg';
import {useState, useEffect, useReducer } from 'react';
import Login from './pages/Login';
import Todo from './components/Todo';
import { db } from './firebase'
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

const ACTIONS = {
    SET_TODOS: 'SET_TODOS',
    ADD_TODO : "ADD_TODO",
    REMOVE_TODO : "REMOVE_TODO",
    TOGGLE_TODO : "TOGGLE_TODO",
};



const reducer = (state, action ) => {
  console.log("Reducer called with ACTION = ", action, " state = ", state);
  switch(action.type) {
    case ACTIONS.SET_TODOS: {
      return { ...state, items : action.payload };
    }
    case ACTIONS.ADD_TODO: {
      return { ...state, items : [...state.items, action.payload ]};
    }
    case ACTIONS.REMOVE_TODO: {
      return { ...state, items: state.items.filter((item) => item.id != action.payload.id) };
    }
    case ACTIONS.TOGGLE_TODO: {
      return { ...state, items: state.items.map((item) => {
        if (item.id === action.payload.id)
        {
          return {...item, complete: !item.complete };
        }
        return item;
      })};
    }
    default:
      throw new Error();
  }
};

const constructTodo = (text) => { return { text : text, complete : false }; };

function App() {

  const [ state, dispatch ] = useReducer(reducer, { items :  []})
  const [ newTodoText, setNewTodoText ] = useState("");

  const syncDataFromDb = () => {
    getDocs(collection(db, "todos")).then((response) => {
      console.log(response.docs);
       const items = response.docs.map((item) => ({ id: item.id, ...item.data() }));
       dispatch({ type: ACTIONS.SET_TODOS, payload: items });
    });
  };

  useEffect(()=>{
    console.log("Use-effect called")
    syncDataFromDb();
  }, []);

  const onRemove = (item) => { 
    deleteDoc(doc(db,"todos", item.id)).then(() => syncDataFromDb());
  };

  const onTextChange = (event) => { 
    setNewTodoText(event.target.value); 
  };

  const onToggleComplete = (item) => { 
    setDoc(doc(db,"todos", item.id), {...item, complete: !item.complete }).then(() => syncDataFromDb());
  };

  const onClick = () => { 
    addDoc(collection(db,"todos"), constructTodo(newTodoText)).then(() => syncDataFromDb());
  };


  return (
    <div className="App">
      <Login />
      <input onChange={ onTextChange } type="text" value={ newTodoText } />
      <button onClick={ onClick }>Add</button>
      {
        //state.items.map((item) => (<Todo item={item} key={item.id} onRemove={onRemove} />))
        state.items.map((item) => (<Todo item={item} key={item.id} onRemove={ onRemove } onToggleComplete={onToggleComplete}/>))
      }
    </div>
  );
}

export default App;
