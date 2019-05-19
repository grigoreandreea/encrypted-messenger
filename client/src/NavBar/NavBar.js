import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './NavBar.css';
import { tokenIsValid, getCookie } from '../cookieParser';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  console.log(tokenIsValid());
  const loginPlace = tokenIsValid()
    ? (
      <Button color="inherit" onClick={() => {window.location.pathname='/profile';}}>
              Hello, {getCookie('firstName')} !
          </Button>
    )
    : (
      <Button color="inherit" onClick={() => {window.location.pathname='/login';}}>
              Login
          </Button>
    )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:"cornflowerblue"}}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"
                      color="inherit"
                      className={classes.grow}>
            <div style={{cursor: 'pointer', padding: '0 12px', width: 200, margin: 'auto'}}
                onClick={() => {window.location.pathname='/';}}>
              Encrypted Messenger
            </div>
          </Typography>
          {loginPlace}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);