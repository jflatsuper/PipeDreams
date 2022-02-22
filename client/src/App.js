import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import About from './About';
import Contact from './Contact';
import Menu from './Menu';
import Login from './AuthComp/Login';

function App() {
  return (
    <>
    <Router>
      <div >

      <Routes>
        <Route path="/" element={<Welcome/>}>
          <Route path="/about" element={<About/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="signin" element={<Login/>}/>

        </Route>
        
      </Routes>

      </div>
      

    </Router>
    </>
  );
}

export default App;
