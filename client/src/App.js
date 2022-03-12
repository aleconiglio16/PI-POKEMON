import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import CreatePokemon from './components/CreatePokemon';
import Details from './components/Details';

function App() {
  return (
      
      <Router>
          <Routes> 
            <Route exact path="/" element={<LandingPage/>} />
            <Route path="/home" element ={<Home/>} />   
            <Route path="/create" element={<CreatePokemon/>} /> 
            <Route path="/details/:id" element={<Details/>} />                 
         </Routes> 
      </Router>
   
   
  );
}

export default App;
