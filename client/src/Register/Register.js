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
    render() {
        const {classes} = this.props;

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