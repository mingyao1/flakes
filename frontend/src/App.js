import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Settings from './Settings';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= { <Home /> }/>
        <Route path='/settings' element= {<Settings/>} />
      </Routes>
    </BrowserRouter>
  );

  

  

}





export default App;
