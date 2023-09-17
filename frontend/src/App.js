import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= { <Home /> }/>
        <Route path='/settings' element />
      </Routes>
    </BrowserRouter>
  );

  

  

}





export default App;
