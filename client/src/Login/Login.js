import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import './Login.css'
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import getCookie from '../cookieParser';
import history from '../history';
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            password: '',
            wrongCredentials: false,
            submitted: false
        }
    }

    componentWillMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.submitted) {
            setTimeout(() => {
                if(!this.state.wrongCredentials) {
                    window.location.pathname='/profile'
                } else {
                    this.setState({
                        submitted: false
                    })
                }
            }, 1500);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="login-wrapper">
                {this.state.submitted &&  <LinearProgress variant="indeterminate" />}
                <div className="margin-auto">
                    <div className="text-wrapper">
                        <h3>Sign in</h3>
                        <div style={{marginTop: 8, color: '#7d8eb4'}}>Let's make today a good day!</div>
                    </div>
                    <TextField
                        label="Phone number"
                        className={classes.textField}
                        type="text"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        margin="normal"
                        variant="outlined"
                        style={{marginTop: 50, width: 270}}
                        value={this.state.phoneNumber}
                        onChange={(ev) => {
                            this.setState({
                                phoneNumber: ev.target.value,
                                wrongCredentials: false
                            })
                        }}
                    />

                    <TextField
                        label="Password"
                        className={classes.textField}
                        type="password"
                        name="password"
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.password}
                        onChange={(ev) => {
                            this.setState({
                                password: ev.target.value,
                                wrongCredentials: false
                            })
                        }}
                    />

                    <Button variant="contained"
                            color="primary"
                            style={{marginTop: 24, width: 270, backgroundColor: 'cornflowerblue', marginLeft: 8}}
                            size="large"
                            onClick={() => {
                                const url = `http://localhost:62421/api/login/Login`;
                                const body = JSON.parse(JSON.stringify(this.state));
                                delete body.submitted;
                                delete body.wrongCredentials;
                                axios.post(url, body)
                                    .then(response => {
                                        document.cookie = `phoneNumber=${this.state.phoneNumber}`;
                                        document.cookie = `token=${response.data.token}`;
                                        document.cookie = `expireDate=${response.data.expireDate}`;
                                        document.cookie = `firstName=${response.data.firstName}`;
                                        this.setState({
                                            submitted: true
                                        })
                                    })
                                    .catch(err => {
                                        this.setState({
                                            submitted: true,
                                            wrongCredentials: true
                                        })
                                    });
                            }}>
                        LOGIN
                    </Button>
                </div>

                {
                    this.state.wrongCredentials && !this.state.submitted &&
                    <h3 style={{color: 'red'}}>
                        Phone number or password are wrong.
                    </h3>
                }

                <div className="text-register-wrapper" style={{margin: 'auto'}}>
                    Or
                    <Link to="/register" style={{textDecoration: 'none', padding: '0 4px', color: 'cornflowerblue'}}>
                        Register
                    </Link>
                    if you don't have an account!
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);