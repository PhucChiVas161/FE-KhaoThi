import React, { Component } from 'react';
import Slide from './Slide/Slide';
import Nofication from './NofiCation/Nofication';
import Lichthi from './Lichthi/Lichthi';
class Home extends Component {
    render() {
        return (
          <div>
            <Slide></Slide>
            <Nofication></Nofication>
            <Lichthi></Lichthi>
          </div>
        )
    }
}

export default Home;