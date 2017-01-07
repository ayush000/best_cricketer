import React from 'react';
import './App.css';
import CardGrid from './CardGrid';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// const data = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }, { a: 4, b: 2 }, { a: 1, b: 2 }, { a: 2, b: 2 }];
class App extends React.Component {

  render() {
    return (
      <div className="App">
        <CardGrid />
      </div>
    );
  }
}

export default App;
