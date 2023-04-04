import "../App/App.css";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import Mastheader from "../Mastheader/Mastheader";
import Nav from "../Nav/Nav";

function App() {
  return (
    <div id="page-top">
      <Nav></Nav>
      <Mastheader></Mastheader>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
