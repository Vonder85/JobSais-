import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as firebase from "firebase";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import "./Register.css";
import { Alert } from "@material-ui/lab";

export const Register = () => {
  /**
   * Permet la redirection
   */
  const navigate = useNavigate();

  /**
   * Objet contenant les infos du user
   */
  const data = {
    company: "",
    email: "",
    phone: "",
    zip: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  /**
   * Hook du loginData
   */
  const [loginData, setLoginData] = useState(data);

  /**
   * Pour afficher un message d'erreur
   */
  const [error, setError] = useState("");

  /**
   * Modifie les données de loginData pour le new user
   * @param e
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  /**
   * Fonction à la soumission du formulaire, enregistre le new User
   * @param e
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { email, password } = loginData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setLoginData({ ...data });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoginData({ ...data });
      });
  };

  const {
    company,
    email,
    phone,
    zip,
    city,
    address,
    password,
    confirmPassword,
  } = loginData;

  /**
   * Affiche le bouton en disabled ou non
   */
  const btn =
    company !== "" &&
    email !== "" &&
    phone !== "" &&
    zip !== "" &&
    city !== "" &&
    address !== "" &&
    password === confirmPassword ? (
      <Button color="primary" variant="contained" size="large" fullWidth>
        Inscription
      </Button>
    ) : (
      <Button variant="contained" color="primary" size="large" fullWidth>
        Inscription
      </Button>
    );

  /**
   * Gestion erreur
   */
  const errorMsg = error !== "" && (
    <Alert variant="outlined" severity="error" className="errorMsg">
      {error}
    </Alert>
  );

  const [villes, setVilles] = useState([""]);

  /**
   *
   * @param zip Recherche villes avec l'API du gouv en fonction du code postal
   */
  const getVilles = (zip: string) => {
    fetch(
      "https://geo.api.gouv.fr/communes?codePostal=" +
        zip +
        "&fields=nom&format=json&geometry=centre"
    )
      .then((res) => res.json())
      .then((result) => {
        let villesGet: string[] = [];

        for (let i = 0; i < result.length; i++) {
          villesGet.push(result[i].nom);
        }
        setVilles(villesGet);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Inscris-toi !</h1>
      {errorMsg}
      <form noValidate onSubmit={(e) => handleSubmit(e)} className="form">
        <TextField
          id="company"
          label="Entreprise"
          name="company"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />

        <TextField
          id="email"
          label="Email"
          name="email"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />
        <TextField
          id="phone"
          label="Téléphone"
          name="phone"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />
        <TextField
          id="zip"
          label="Code Postal"
          name="zip"
          onChange={(event) => handleChange(event)}
          onBlur={() => getVilles(zip)}
          fullWidth
        />
        <br />
        <FormControl fullWidth>
          <InputLabel id="city">Ville</InputLabel>
          <Select
            labelId="city"
            id="city"
            name="city"
            value={city}
            onChange={(e) =>
              setLoginData({ ...loginData, city: e.target.value as string })
            }
          >
            {villes.map((ville: string) => {
              return <MenuItem value={ville}>{ville}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <br />
        <TextField
          id="address"
          label="Adresse"
          name="address"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />
        <TextField
          id="password"
          label="Mot de passe"
          name="password"
          type="password"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />
        <TextField
          id="confirmPassword"
          label="Confirmation"
          name="confirmPassword"
          type="password"
          onChange={(event) => handleChange(event)}
          fullWidth
        />
        <br />
        <br></br>
        {btn}
      </form>
      <Link to="/Connexion">Déjà inscrit ? Connecte-toi</Link>
    </div>
  );
};
