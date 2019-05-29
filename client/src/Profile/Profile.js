import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
//import logo from './logo.png';
import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            phoneNr:'',
            description: '',
            wrongCredentials: false,
            submitted: false
        }
    }
    //componentDidMount() {
        //const userPhoneNr = this.props.pageState.auth.id;
      //}
     // getProfile(){
       // var self = this;
       // axios.post('/getProfile', {
      //  })
      //  .then(function (response) {
     //     if(response){
       //     self.setState({name:response.data.name});
       //     self.setState({email:response.data.email});
        //    self.setState({password:response.data.password});  
       //   }
     //   })
     //   .catch(function (error) {
     //     console.log('error is ',error);
     //   });
     // }
    render() {
        return (
            <div className="Profile">
                <div className="header">User profile</div>
                <div className="left bottom"> Phone nr</div>
                <div className="right bottom">Description</div>
                
            </div>
        )
    }
}


export default Profile;