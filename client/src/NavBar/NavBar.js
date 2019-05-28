import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './NavBar.css';
import { tokenIsValid, getCookie } from '../cookieParser';
import axios from 'axios';
import history from '../history'

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

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  render() {
    const { classes } = this.props;
    console.log(tokenIsValid());
    const loginPlace = tokenIsValid()
      ? (
        <React.Fragment>
          <Button color="inherit" 
                  aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={(ev) => {
                    this.setState({ anchorEl: ev.currentTarget });
                  }}>
                  Hello, {getCookie('firstName')} !
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={(ev) => {
              this.setState({ anchorEl: null });
            }}
          >
          <MenuItem onClick={() => {window.location.pathname='/profile';}}>Profile</MenuItem>
          <MenuItem onClick={() => {
            const url = `http://localhost:62421/api/login/Logout/${getCookie('token')}`;
            axios.get(url)
                .then(() => {
                  document.cookie = "expireDate= ''";
                  window.location.pathname='/'
                });
          }}>Logout</MenuItem>
        </Menu>
        </React.Fragment>
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
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);

