import React from 'react';
import './contacts.css'
import axios from 'axios';
import { tokenIsValid, getCookie } from '../cookieParser';
import Messenger from '../Messenger/Messenger'
import { Typography, Chip } from '@material-ui/core'
import moment from 'moment';

export default class Contacts extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            otherUser: null,
            messages: []
        }

        this.newMessageReceived = this.newMessageReceived.bind(this);
    }

    componentDidMount() {
        if (tokenIsValid) {
            const url = `http://localhost:62421/api/Users/` + getCookie('userId');
            axios.get(url)
                .then((res) => {
                    const { data: response } = res;
                    const messages = [];
                    if (response.Messages.length > 0) {
                        response.Messages.forEach((el, index) => {
                            if (el.IdUserSent && el.IdUserSent == getCookie('userId') || el.IdUserReceived && el.IdUserReceived == getCookie('userId')) {
                                messages.push(el);
                            }
                        })

                        response.Messages[0] 
                            && response.Messages[0] 
                            && response.Messages[0].User1
                            && response.Messages[0].User1.Messages
                            && response.Messages[0].User1.Messages.length > 0
                            && response.Messages[0].User1.Messages.forEach((el, index) => {
                            if (el.IdUserSent && el.IdUserSent == getCookie('userId') || el.IdUserReceived && el.IdUserReceived == getCookie('userId')) {
                                messages.push(el);
                            }
                        })

                        response.Messages[0]
                            && response.Messages[0] 
                            && response.Messages[0].User1
                            && response.Messages[0].User1.Messages1
                            && response.Messages[0].User1.Messages1.length > 0
                            && response.Messages[0].User1.Messages1.forEach((el, index) => {
                            if (el.IdUserSent && el.IdUserSent == getCookie('userId') || el.IdUserReceived && el.IdUserReceived == getCookie('userId')) {
                                messages.push(el);
                            }
                        })
                    } else if (response.Users1[0].Messages.length > 0) {
                        response.Users1[0].Messages.forEach((el, index) => {
                            if (el.IdUserSent && el.IdUserSent == getCookie('userId') || el.IdUserReceived && el.IdUserReceived == getCookie('userId')) {
                                messages.push(el);
                            }
                        })
                    }
                    
                    if(messages.length > 1) {
                        messages.sort((el1, el2) => {
                            const firstDate = moment(el1.SentDate);
                            const secondDate = moment(el2.SentDate);
                            const diff = firstDate.diff(secondDate);
                            if (diff > 0) {
                                return 1;
                            } else if(diff < 0) {
                                return -1;
                            }
                            return 0;
                        })
                    }

                    this.setState({
                        otherUser: response.Messages[0] && response.Messages[0].User1,
                        messages: messages
                    })
                    console.log(response);
                })    
        }
    }

    newMessageReceived(message) {
        const { messages } = this.state;
        messages.push(message)
        this.setState({
            messages
        })
    }

    render(){

        return(
            <div className="app-messenger">
                <div className="header"></div>
                <div className="main">
                    <div className="left">
                        <div className="contactsTitle" style={{display: 'flex'}}>
                            <Typography variant='body1' style={{margin: 'auto'}}>Contacts</Typography></div>
                        <div className="actualContacts">
                            
                            <div className="allContacts">
                                
                            <div className="oneContact">
                                <div className="user-image">
                                </div>
                                <div className="user-info">
                                    <h2>Roxana</h2>
                                </div>
                            </div>                                
                        
                            <div className="oneContact">
                                <div className="user-image">
                                </div>
                                <div className="user-info">
                                    <h2>Andreea</h2>
                                </div>
                            </div>  

                            <div className="oneContact">
                                <div className="user-image">
                                </div>
                                <div className="user-info">
                                    <h2>Iancu</h2>
                                </div>
                            </div>  

                            <div className="oneContact">
                                <div className="user-image">
                                </div>
                                <div className="user-info">
                                    <h2>Ana</h2>
                                </div>
                            </div>  
                        
                        
                        </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="messengerTitle" style={{display: 'flex'}}>
                            <Typography variant='body1' style={{margin: 'auto'}}>Messenger</Typography>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{height: 384, margin: 8, display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                            {
                                this.state.messages.map((message, key) => {
                                    let content = null;
                                    if( message.IdUserSent == getCookie('userId') ) {
                                        content = (
                                        <div className="right-message" key={key}>
                                            <Chip label={message.Content} />
                                        </div>
                                    );
                                    } else if (message.IdUserReceived == getCookie('userId')) {
                                        content = (
                                        <div className="left-message" key={key}>
                                            <Chip label={message.Content} />
                                        </div>
                                    );
                                    }
                                    return content;
                                })
                            }
                            </div>
                            <div style={{margin: '0 8px 8px'}}>
                                <Messenger newMessageReceived={this.newMessageReceived}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}