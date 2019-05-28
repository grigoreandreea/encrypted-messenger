import React from 'react';
import { Button, TextField } from '@material-ui/core'
const signalR = require("@aspnet/signalr");

export default class Messenger extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            message: '',
            messages: [],
            hubConnection: null
        };
    }

    componentDidMount() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44328/chatHub")
            .build();
        
        connection.on("ReceiveMessage", message => {
            this.setState({message})
        });
        
        connection.start({withCredentials: true})
            .catch((e) => console.log('start', e));
        
        this.setState({
            hubConnection: connection
        })
    }


      render() {
        return (
          <div>
                 Message from server: {this.state.message}

                <TextField value={this.state.text}
                           onChange={(ev) => {
                                this.setState({
                                    text: ev.target.value
                                })
                            }}
                />

                <Button onClick={() => {
                    this.state.hubConnection
                        .invoke('SendMessage', 8, null, null, this.state.message, new Date())
                        .catch((e) => {
                            console.log('click', e)
                        })
                }}>Send message</Button>
          </div>
        );
      }
}