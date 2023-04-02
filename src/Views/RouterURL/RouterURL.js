import React, { Component } from 'react';
import {Route, Routes} from "react-router-dom";
import Home from '../Home/Home';
import Introduce from '../Introduce/Introduce';
import Login from '../Login/Login';
import Tracuu from '../Tracuu/Tracuu';
class RouterURL extends Component {
    render() {
        return (
            
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route   element={<Home />} />
                        <Route  path="/Home" element={<Home />} />
                        <Route  path="/Introduce" element={<Introduce />} />
                        <Route  path="/Login" element={<Login />} />
                        <Route  path="/Tracuu" element={<Tracuu />} />

                    </Routes>
                </div>
            
        );
    }
}

export default RouterURL;