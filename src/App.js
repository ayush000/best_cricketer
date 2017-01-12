import React from 'react';
import './App.css';
import CardGrid from './CardGrid';
import Panels from './Panels';
import MediaQuery from 'react-responsive';

// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// const data = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }, { a: 4, b: 2 }, { a: 1, b: 2 }, { a: 2, b: 2 }];
class App extends React.Component {

  render() {
    return (
      <div className="App">
        <CardGrid />
        <MediaQuery query='(min-width: 500px)'>
          <Panels padding="60px" aspect={4.0 / 1.5} />
        </MediaQuery>
        <MediaQuery query='(max-width: 500px)'>
          <Panels padding="0px" aspect={4.0 / 2.5} />
        </MediaQuery>
      </div>

    );
  }
}

export default App;
