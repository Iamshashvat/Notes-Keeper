import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import NoteContext from "../../context/note/noteContext";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const noteContext = useContext(NoteContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearNotes } = noteContext;

  const onLogout = () => {
    logout();
    clearNotes();
  };
  const authLinks = (
    <Fragment>
      <p>Hello {user && user.name}</p>

      <IconButton
        aria-label='Logout as current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={onLogout}
        color='inherit'
      >
        <ExitToApp />
      </IconButton>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button component={Link} to={"/register"} color='inherit'>
        Register
      </Button>
      <Button color='inherit' component={Link} to={"/login"}>
        Login
      </Button>
    </Fragment>
  );
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <i className={icon} /> {title}
        </Typography>
        {isAuthenticated ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Note Keeper",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
