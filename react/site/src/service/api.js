import axios from 'axios'
const api = axios.create({
    baseURL: "https://devstorefrei.herokuapp.com"
})

export default class Api {
    async listar() {
        let r = await api.get('/produto');
        return r.data;
    }

    async inserir(nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao) {
        let r = await api.post('/produto', { nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao });
        return r.data;
    }

    async alterar(id, nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao) {
        let r = await api.put('/produto/' + id, { nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao });
        return r.data;
    }

    async remover(id) {
        let r = await api.delete('/produto/' + id);
        return r.data;
    }
}