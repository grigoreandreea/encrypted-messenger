import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import './Register.css'
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
            submitted: false,
            successText: ''
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return value === this.state.password;
        });

        ValidatorForm.addValidationRule('isPhoneNumber', (value) => {
            return value.length === 10 && !isNaN(value)
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.submitted) {
            setTimeout(() => {
                this.setState({
                    submitted: false,
                    successText: 'You have successfully created your account!'
                })
            }, 1500);
        }
    }

    render() {
        const {classes} = this.props;
        const footerText = this.state.successText === ''
            ? <React.Fragment>
                Or
                <Link to="/login" style={{textDecoration: 'none', padding: '0 4px', color: 'cornflowerblue'}}>
                    Login
                </Link>
                if you already have an account!
            </React.Fragment>
            : <h3 style={{color: 'green'}}>
                {this.state.successText}
              </h3>;

        return (
            <ValidatorForm className="register-wrapper" onSubmit={(event) => {
                event.preventDefault();
                const url = `http://localhost:62421/api/users`;
                const body = JSON.parse(JSON.stringify(this.state));
                body.birthDate = moment(body.birthDate).format();
                delete body.confirmPassword;
                delete body.submitted;
                axios.post(url, body)
                    .then(response => {
                        this.setState({
                            submitted: true
                        })
                    });
            }}>
                {this.state.submitted &&  <LinearProgress variant="indeterminate" />}
                <div className="margin-auto">
                    <div className="text-wrapper">
                        <h3>Register</h3>
                    </div>
                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['First name is required!']}
                    />

                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['Last name is required!']}
                    />

                    <TextValidator
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
                        validators={['isPhoneNumber']}
                        errorMessages={['Phone number is required and must be a valid number!']}
                    />

                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['Birth date is required!']}
                    />

                    <TextValidator
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
                        validators={['required']}
                        errorMessages={['Password is required!']}
                    />

                    <TextValidator
                        label="Confirm password"
                        className={classes.textField}
                        type="password"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        margin="normal"
                        variant="outlined"
                        style={{width: 270}}
                        value={this.state.confirmPassword}
                        validators={['isPasswordMatch']}
                        errorMessages={['Password must match!']}
                        onChange={(ev) => {
                            this.setState({
                                confirmPassword: ev.target.value
                            })
                        }}
                    />

                    <Button variant="contained"
                            color="primary"
                            style={{marginTop: 24, width: 270, backgroundColor: 'cornflowerblue', marginLeft: 8}}
                            size="large"
                            type="submit">
                        REGISTER
                    </Button>
                </div>
                <div className="text-register-wrapper" style={{margin: 'auto', paddingBottom: 10}}>
                    {footerText}
                </div>
            </ValidatorForm>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);