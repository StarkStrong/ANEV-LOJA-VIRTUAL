const express = require("express")
const Produto = require("../models/produtos")

const route = express.Router()

route.get("/listagem", async (req, res) => {
    const { id } = req.query

    const produto = await Produto.findOne({ _id: id })

    if (produto) {
        res.send(produto)
    } else {
        res.send("Produto não encontrado")
    }
})

route.post("/cadastrar", async (req, res) => {
    await Produto.create(req.body, (err, ret) => {
        if (err)
            return res.send(err.message)
        return res.send("Produto cadastrado com sucesso.")
    })
})

route.put("/alterar", async (req, res) => {
    const { _id, preco, nome, imagem, descricao, quantidade } = req.body

    const produto = await Produto.findOne({ _id: _id })

    if (produto) {
        await Produto.updateOne(
          { _id: _id },
          { $set: { nome: nome, preco: preco, imagem: imagem, descricao: descricao, quantidade: quantidade }}
        )
        res.send("Produto atualizado com sucesso!")
    } else {
        res.send("Produto não encontrado")
    }
})

route.delete("/deletar", async (req, res) => {
    const { id } = req.query

    const dados = await Produto.findOne({ _id: id })

    if (dados == null) {
        res.send("Produto não encontrado")
        return false
    }
    const mudanca = "O produto "+dados.nome+" foi apagado!";

    await Produto.updateOne({ _id: id }, { $set: { ativo: false }})

    res.send(mudanca);
})

module.exports = app => app.use("", route)