import React from 'react';
import PizzaList from './components/pizzalist';
import { useDarkMode } from "./store/selectors";
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import AddPizzaForm from './components/addPizzaForm';

function App() {
  const isDarkMode = useSelector(useDarkMode);
  const dispatch = useDispatch();

  const background = isDarkMode
    ? { backgroundColor: "#282c34", color: "white" }
    : { backgroundColor: "#ffffff", color: "black" };

  const toggleDarkMode = () => {
    const action = {
      type: "TOGGLE_DARK_MODE",
    };
    dispatch(action);
  };
  return (
    <div className="App">
      <header className="App-header" style={background}>
        <button onClick={toggleDarkMode}>Dark Mode!</button>
        <PizzaList />
        <AddPizzaForm />

      </header>
    </div>
  );
}

export default App;
