import { Button } from "@material-ui/core";
import React from "react";
import "./Home.css";
import * as firebase from "firebase";

export const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenue sur Jobs Sais' !</h1>
      <h3>Tu cherches</h3>
      <div className="boutons">
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ borderRadius: 25 }}
        >
          Un job
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{ borderRadius: 25 }}
        >
          Du staff
        </Button>
      </div>
    </div>
  );
};
