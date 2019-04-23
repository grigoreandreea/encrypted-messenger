import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact strict render={
                    () => {
                        return (<h1>Welcome aboard!</h1>)}
                }/>
            </div>
        );
    }
}

export default Routes;
