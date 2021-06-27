import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Typography} from "@material-ui/core";
import './designe.css';

const Header = () => {
  const [nome, setNome] = useState(null);

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nome');
    if (nomeUsuario) {
      setNome(nomeUsuario)
    } else {
      setNome(null)
    }
  }, [])

  return (
    <Container className="header fundobranco pd10 mt10">
      <Typography variant="h4">
        {nome ? `Bem vindo, ${nome}` : 'SEJA BEM VINDO'}
        <Link to={nome ? 'sair' : 'login'} style={{textDecoration: 'none'}}>
        <Button variant="contained" className="designe.css float">
          {nome ? 'Sair' : 'Login'}
        </Button>
      </Link>
      </Typography>
      {nome ? (
        <Link to="cadastrar" style={{textDecoration: 'none'}}>
          <Button variant="contained" 
          className="btncadastrar">
            NOVO PRODUTO
          </Button>
        </Link>
      ) : ''}

    </Container>
  )
}

export default Header;