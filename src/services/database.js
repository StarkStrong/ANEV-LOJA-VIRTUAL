import axios from "axios";

export const login = (usuario, senha) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    usuario,
    senha
  })
}

export const listagem = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/listagem`)
}

export const detalhes = (id, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/admin/produto?id=${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const adicionar = (produto, token) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/cadastrar`,
    produto,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const editar = (produto, token) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/alterar`,
    produto,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const apagar = (_id, token) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/deletar`,
    {
      params: {
        _id
      },
      headers: {
        Authorization: token
      }
    }
  )
}