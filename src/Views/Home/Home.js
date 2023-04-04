import Notification from "./NofiCation/Nofication";
import Projects from "./Projects/Projects";
import Signup from "./Signup/Signup";

function Home() {
  return ( 
    <div>
      <Notification></Notification>
      
    {/* Projects*/}
    <Projects></Projects>
    {/* Signup*/}
    <Signup></Signup>
  

    </div>
   );
}

export default Home;