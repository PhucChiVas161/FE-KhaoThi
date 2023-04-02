import './App.css';
import '../assets/css/style.css';
import Mastheader from '../Mastheader/Mastheader';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Nofication from '../Home/NofiCation/Nofication';
import Signup from '../Signup/Signup';

// import {Router} from "react-router-dom";
function App() {
  return (
    <div id="page-top">
            {/* Navigation*/}
            <Nav></Nav>
            {/* Mastheader*/}
            <Mastheader></Mastheader>
            {/* Home*/}
            <Nofication></Nofication>
            {/* sigup*/}
            <Signup></Signup>
            {/* Footer*/}
          <Footer></Footer>
    </div>
  
  );
}

export default App;
