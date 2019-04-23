import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';
import {Router} from 'react-router-dom';
import history from '../history';
import Routes from '../Routes';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className="App-header">
                    <Router history={history}>
                        <Routes/>
                    </Router>
                </div>
                <footer className="App-footer">
                    <aside>Copyright &copy; Encrypted Systems &amp; Co 2019</aside>
                </footer>
            </div>
        );
    }
}

export default App;
