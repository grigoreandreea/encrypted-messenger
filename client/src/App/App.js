import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';
import Routes from '../Routes';
import history from '../history';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const backgrounColorClassName = history.location.pathname === '/login' || history.location.pathname === '/register'
            ? 'App-light-background'
            : 'App-dark-background';
        const footerColorClassName = history.location.pathname === '/login' || history.location.pathname === '/register'
            ? 'App-light-color'
            : 'App-dark-color';
        return (
            <div className={'App ' + backgrounColorClassName}>
                <NavBar/>
                <div className={'App-header ' + backgrounColorClassName}>
                    <Routes/>
                </div>
                <footer className={'App-footer ' + footerColorClassName}>
                    <aside>Copyright &copy; Encrypted Systems &amp; Co 2019</aside>
                </footer>
            </div>
        );
    }
}

export default App;
