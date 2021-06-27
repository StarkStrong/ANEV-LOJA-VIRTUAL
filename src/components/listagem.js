import React, { useState, useEffect } from "react";
import {apagar, listagem} from "../services/database";
import Header from "./header";
import { DataGrid } from '@material-ui/data-grid';
import {Button, Container, Typography} from "@material-ui/core";
import Confirmacao from "./confirmacao";
import {Redirect} from "react-router-dom";
import './designe.css';


const Listagem = () => {
  const [editar, setEditar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const logado = localStorage.getItem('token');

  useEffect(() => {
    if (produtos.length === 0) {
      listagem()
        .then(response => {
          setProdutos(response.data.map(item => {
            return {
              id: item._id,
              ...item
            }
          }))
        })
        .catch(error => {
          alert(error)
        })
    }
  }, [produtos]);

  const columns = [
    {
      field: 'imagem',
      width: 200,
      headerName: 'Imagem',
      renderCell: (params) => (<img src={params.value} height={100} width={100} alt="" />)
    },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'quantidade', headerName: 'Quantidade', width: 160 },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 120,
      renderCell: (params) => {
        return `R$ ${params.value}`
      }
    }
  ];

  const apagarProduto = () => {
    apagar(produtoSelecionado, logado)
      .then(response => {
        alert(response.data)
        setProdutos([]);
        setConfirmar(false)
        setProdutoSelecionado(null)
      })
      .catch(error => {
        alert(error)
      })
  }

  const alertaApagar = (id) => {
    setProdutoSelecionado(id)
    setConfirmar(true)
  }

  const editarProduto = (id) => {
    localStorage.setItem('_id', id);
    setEditar(true);
  }

  if (logado) {
    columns.push({
      field: '',
      width: 220,
      headerName: 'Ações',
      disabledClickEventBubbling: true,
      renderCell: ((params) => {
        return (
          <div>
            <Button
              variant="contained"
              className="btnedit"
              onClick={() => editarProduto(params.id)}
            >
              EDITAR
            </Button>
            <Button
              variant="contained"
              className="corlogin"
              onClick={() => alertaApagar(params.id)}
            >
              EXCLUIR
            </Button>
          </div>
        )
      })
    })
  }

  if (editar) {
    return <Redirect to="cadastrar" />
  }

  return (
    <>
      <Header />
      <Container
      className="fundobranco pd10"
      >
        <br />
        <Typography className="produto-titulo" variant="h5">
          Produtos
        </Typography>
        <br />
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={produtos} columns={columns} pageSize={10} rowHeight={100}
          className="fundobranco"
          />
        </div>
      </Container>
      {
        confirmar
        &&
        <Confirmacao
          open={confirmar}
          positive="Apagar"
          negative="Cancelar"
          onAceept={() => apagarProduto()}
          onClose={() => setConfirmar(false)}
          message="Quer mesmo excluir?"
        />
      }
    </>
  )
}

export default Listagem;