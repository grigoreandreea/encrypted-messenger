import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Messenger from "./Messenger/Messenger";

class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome aboard! <a href="/login" style={{textDecoration: 'none', color: 'white'}}>Login to get started!</a></h1>)}
                }/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/register" exact strict component={Register}/>
                <Route path="/profile" exact strict component={Profile}/>
                <Route path="/messenger" exact strict component={Messenger}/>
            </div>
        );
    }
}

export default Routes;
