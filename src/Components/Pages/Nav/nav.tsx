import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Nav = () => {
  const classes = useStyles();
  var user = firebase.auth().currentUser;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Job Sais'</Link>
          </Typography>

          {!user ? (
            <>
              <Link to="/Connexion">
                <Button color="inherit" style={{ borderRadius: 25 }}>
                  Se connecter
                </Button>
              </Link>
              <Link to="Inscription">
                <Button color="inherit" style={{ borderRadius: 25 }}>
                  S'inscrire
                </Button>
              </Link>
            </>
          ) : (
            <a>
              <Button
                color="inherit"
                style={{ borderRadius: 25 }}
                onClick={() => firebase.auth().signOut()}
              >
                Déconnexon
              </Button>
            </a>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
