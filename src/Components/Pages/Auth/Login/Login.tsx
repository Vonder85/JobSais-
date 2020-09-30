import React, { useState } from "react";
import * as firebase from "firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  /**
   * Permet la redirection
   */
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <h1>Connecte-toi !</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <label>
          Email :
          <input
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Mot de passe :
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};
export default Login;
