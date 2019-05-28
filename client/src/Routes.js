import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Contacts from './Contacts/contacts';

class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome aboard!</h1>)}
                }/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/contacts" exact strict component={Contacts}/>
                <Route path="/register" exact strict component={Register}/>
                <Route path="/profile" exact strict component={Profile}/>
            </div>
        );
    }
}

export default Routes;
