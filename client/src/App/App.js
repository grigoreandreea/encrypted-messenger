import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './App.css';
import Routes from '../Routes';
import history from '../history';
import { tokenIsValid } from '../cookieParser';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (!tokenIsValid()) {
            if (window.location.pathname !== "/" && window.location.pathname !== "/register" && window.location.pathname !== "/login") {
                window.location.pathname = "/login";
            }
        }
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
