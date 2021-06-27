import React, { useState } from "react";
import {login} from "../services/database";
import { Redirect } from 'react-router-dom';
import {Button, Container, TextField, Typography} from "@material-ui/core";

const Login = () => {
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [logado, setLogado] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    login(usuario, senha)
      .then(response => {
          if (!response.data.token) {
            alert('Dados incorretos.')
          } else {
            localStorage.setItem('nome', usuario);
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            setLogado(true);
          }
      })
      .catch(error => {
        alert(error);
      })
  }

  if (logado) {
    return <Redirect to="/" />
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">
        Login
      </Typography>
      <form className="login" onSubmit={handleOnSubmit}>
        <TextField
          required
          label="Usuário"
          className="input"
          placeholder="Usuário"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          required
          label="Senha"
          value={senha}
          type="password"
          className="input"
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
        >
          Entrar
        </Button>
      </form>
    </Container>
  )
}

export default Login;