import React from 'react';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }, { a: 4, b: 2 }, { a: 1, b: 2 }, { a: 2, b: 2 }];
function App() {
  return (
    <div className="App">
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="a" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="b" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default App;
