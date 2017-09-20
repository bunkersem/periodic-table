import React, { Component } from 'react';
import PeriodicTable from './components/periodic-table/periodic-table';
var logo;
if (!process.env.PRERENDER) {
  console.log('loading css');
  logo = require('./logo.svg');
  require('./App.css');
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h2>Periodic Table</h2>
        </div>
        <div style={{ margin: '50px' }}>
            <PeriodicTable id="pt1" />
          </div>
      </div>
    );
  }
}
console.log('exporting');
export default App;
