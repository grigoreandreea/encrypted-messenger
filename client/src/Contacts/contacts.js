import React from 'react';
import './contacts.css'
import logo from './logo.png';

export default class Contacts extends React.Component{

render(){

    return(
        <div className="app-messenger">
            <div className="header"></div>
            <div className="main">
                <div className="left">
                    <div className="contactsTitle">Contacts</div>
                    <div className="actualContacts">
                        
                        <div className="allContacts">
                            <div className="oneContact">
                                <div className="user-image">
                                    {/* <img src=[logo] */}
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>
                        
                            <div className="oneContact">
                                <div className="user-image">

                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt=""/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                            <div className="oneContact">
                                <div className="user-image">
                                    <img src="no-photo.jpg" alt="aaa"/>
                                </div>
                                <div className="user-info">
                                  <h2>Iancu Andrei</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="messengerTitle">Messenger</div>
                    <div className="actualMessenger"></div>
                </div>
            </div>
        </div>
    )


}

}