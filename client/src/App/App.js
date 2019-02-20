import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <div className="App-header">
              Welcome aboard!
          </div>
          <footer className="App-footer">
            <aside>Copyright &copy; Encrypted Systems &amp; Co 2019</aside>
          </footer>
      </div>
    );
  }
}

export default App;
