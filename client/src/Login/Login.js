import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import './Login.css'
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
            <div className="login-wrapper">
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

                    <Button variant="contained"
                            color="primary"
                            style={{marginTop: 24, width: 270, backgroundColor: 'cornflowerblue', marginLeft: 8}}
                            size="large">
                        LOGIN
                    </Button>
                </div>
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