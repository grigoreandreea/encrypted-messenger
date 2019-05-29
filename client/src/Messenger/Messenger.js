import React from 'react';
import { Button, TextField } from '@material-ui/core'
import { tokenIsValid, getCookie } from '../cookieParser';
const signalR = require("@aspnet/signalr");

export default class Messenger extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            text: '',
            message: {},
            messages: [],
            hubConnection: null
        };
    }

    componentDidMount() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44328/chatHub")
            .build();
        
        connection.on("ReceiveMessage", message => {
            const parsedMessage = JSON.parse(message)
            this.setState({message: parsedMessage})
            this.props.newMessageReceived(parsedMessage);
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
                <TextField style={{width: 'calc(100% - 142px)'}}
                           value={this.state.text}
                           variant='outlined' 
                           onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                if (tokenIsValid()) {
                                    this.state.hubConnection
                                        .invoke('SendMessage', getCookie('userId'), getCookie('userId') == 8 ? 7 : 8, null, this.state.text, new Date())
                                        .catch((e) => {
                                            console.log('click', e)
                                    });
                                    this.setState({
                                        text: ''
                                    })
                                }
                            }
                           }}
                           onChange={(ev) => {
                                this.setState({
                                    text: ev.target.value
                                })
                            }}
                />

                <Button style={{marginTop: 8, marginLeft: 4}}
                        color='primary'
                        variant='outlined'
                        onClick={() => {
                            if (tokenIsValid()) {
                                this.state.hubConnection
                                    .invoke('SendMessage', getCookie('userId'), getCookie('userId') == 8 ? 7 : 8, null, this.state.text, new Date())
                                    .catch((e) => {
                                        console.log('click', e)
                                });
                                this.setState({
                                    text: ''
                                })
                            }
                }}>Send message</Button>

                {/* <div>Message from server: {this.state.message.Content}</div> */}
          </div>
        );
      }
}