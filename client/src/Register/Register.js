import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import './Register.css'
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

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
            firstName: '',
            lastName: '',
            birthDate: '',
            password: '',
            confirmPassword: ''
        }
    }

    render() {
        const {classes} = this.props;
        console.log('state changed: ', this.state)
        return (
            <div className="register-wrapper">
                <div className="margin-auto">
                    <div className="text-wrapper">
                        <h3>Register</h3>
                    </div>
                    <TextField
                        label="First name"
                        className={classes.textField}
                        type="text"
                        name="firstName"
                        autoComplete="firstName"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.firstName}
                        onChange={(ev) => {
                            this.setState({
                                firstName: ev.target.value
                            })
                        }}
                    />

                    <TextField
                        label="Last name"
                        className={classes.textField}
                        type="text"
                        name="lastName"
                        autoComplete="lastName"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.lastName}
                        onChange={(ev) => {
                            this.setState({
                                lastName: ev.target.value
                            })
                        }}
                    />

                    <TextField
                        label="Phone number"
                        className={classes.textField}
                        type="text"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.phoneNumber}
                        onChange={(ev) => {
                            this.setState({
                                phoneNumber: ev.target.value
                            })
                        }}
                    />

                    <TextField
                        label="Birth date"
                        className={classes.textField}
                        name="birthDate"
                        autoComplete="birthDate"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.birthDate}
                        onChange={(ev) => {
                            this.setState({
                                birthDate: ev.target.value
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
                                password: ev.target.value
                            })
                        }}
                    />

                    <TextField
                        label="Confirm password"
                        className={classes.textField}
                        type="password"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.confirmPassword}
                        onChange={(ev) => {
                            this.setState({
                                confirmPassword: ev.target.value
                            })
                        }}
                    />

                    <Button variant="contained"
                            color="primary"
                            style={{marginTop: 24, width: 270, backgroundColor: 'cornflowerblue', marginLeft: 8}}
                            size="large">
                        REGISTER
                    </Button>
                </div>
                <div className="text-register-wrapper" style={{margin: 'auto', paddingBottom: 10}}>
                    Or
                    <Link to="/login" style={{textDecoration: 'none', padding: '0 4px', color: 'cornflowerblue'}}>
                        Login
                    </Link>
                    if you already have an account!
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);