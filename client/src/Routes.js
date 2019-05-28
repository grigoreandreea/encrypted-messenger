import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Contacts from './Contacts/contacts';
import Messenger from "./Messenger/Messenger";

class Routes extends Component {

    render() {
        return (
            <div>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome aboard! <Link to="/login" style={{textDecoration: 'none', color: '#7d8eb4'}}>Login to get started!</Link></h1>)}
                }/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/contacts" exact strict component={Contacts}/>
                <Route path="/register" exact strict component={Register}/>
                <Route path="/profile" exact strict component={Profile}/>
                <Route path="/messenger" exact strict component={Messenger}/>
            </div>
        );
    }
}

export default Routes;
