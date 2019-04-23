import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome aboard!</h1>)}
                }/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/register" exact strict component={Register}/>
            </div>
        );
    }
}

export default Routes;
