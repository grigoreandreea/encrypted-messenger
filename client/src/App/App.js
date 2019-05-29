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
            if (history.location.pathname !== "/" && history.location.pathname !== "/register" && history.location.pathname !== "/login") {
                history.push("/login");
            }
        }
    }

    render() {
        return (
            <div className={'App-light-background'}>
                <NavBar/>
                <div className={'App-header App-light-color'}>
                    <Routes/>
                </div>
                <footer className={'App-footer App-light-color'}>
                    <aside>Copyright &copy; Encrypted Systems &amp; Co 2019</aside>
                </footer>
            </div>
        );
    }
}

export default App;
