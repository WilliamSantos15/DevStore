
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import LoadingBar from 'react-top-loading-bar';

import { Container, Conteudo } from './styled'

import { useState, useEffect, React, useRef } from 'react';

import Api from '../../service/api';
const api = new Api();


export default function Index() {

    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precoDE, setPrecoDE] = useState('');
    const [precoPOR, setPrecoPOR] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [dsproduto, setDsproduto] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imgproduto, setImgproduto] = useState('');
    const [idAlterando, setIdAlterando] = useState(0);
    const loading = useRef();



    async function listar() {
        loading.current.continuousStart();
        let r = await api.listar();
        setProdutos(r);
        loading.current.complete();
    }

    useEffect(() => {
        listar();
    }, 
        [])

    async function inserir() {

        loading.current.continuousStart();
        if (nome === (''))
            return toast.error('❌ Nome inválido');
        if (categoria === (''))
            return toast.error('❌ Categoria inválida');
        if (avaliacao === (isNaN) || avaliacao ===('') || avaliacao < 0)
            return toast.error('❌ Avaliação inválida');
        if (precoDE === ('') || precoDE === (isNaN) || precoDE < 0)
            return toast.error('❌ Preço de inválido');
        if (precoPOR === ('') || precoPOR === (isNaN) || precoPOR < 0)
            return toast.error('❌ Preço por inválido');
        if (estoque === ('') || estoque === (isNaN) || estoque < 0)
            return toast.error('❌ Estoque inválido');
        if (imgproduto === (''))
            return toast.error('❌ Imagem inválida');
        if (dsproduto === (''))
            return toast.error('❌ Descrição inválida');

            if (idAlterando == 0 ) {
                let r = await api.inserir(nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto);
                
                if (r.erro)
                    toast.dark(r.erro);
                else
                    toast.dark('✅ Produto inserido!');
                    listar();
            } else {
                let r = await api.alterar(idAlterando, nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto);

                if (r.erro)
                    toast.dark(r.erro);
                else
                    toast.dark('✅ Produto alterado!');
                    limparcampos()
                    listar();
            }
        listar()
        loading.current.complete()
    }

    function limparcampos() {
        setNome('');
        setCategoria('');
        setPrecoDE('');
        setPrecoPOR('');
        setAvaliacao('');
        setDsproduto('');
        setEstoque('');
        setImgproduto('')
        setIdAlterando(0);

    }

    async function remover(id) {
        loading.current.continuousStart();
        confirmAlert({
            title: 'Remover produto',
            message: `Tem certeza que deseja remover o produto ${id}?`,
            buttons: [
                {
                    label: 'Sim, remover',
                    onClick: async() => {
                        let r = await api.remover(id)
                        if(r.erro) {
                            toast.dark(r.erro)
                        } else {
                            toast.dark('🗑️ Produto Removido')
                        }
                        listar();
                    }
                },
                {
                    label: 'Não, Cancelar'
                }
            ]

        })
        listar()

        loading.current.complete()
    }

    async function editar(item) {
        setNome(item.nm_produto);
        setCategoria(item.ds_categoria);
        setPrecoDE(item.vl_preco_de);
        setPrecoPOR(item.vl_preco_por);
        setAvaliacao(item.vl_avaliacao);
        setDsproduto(item.ds_produto);
        setEstoque(item.qtd_estoque);
        setImgproduto(item.img_produto)
        setIdAlterando(item.id_produto);
    }

    return (
        <Container>
            <ToastContainer/>
            <LoadingBar color="#10EAEA" ref={loading} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student"> {idAlterando == 0 ? "Novo Produto" : "Alterando Produto " + idAlterando}</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="inputsman">
                                <div class="input-upper">
                                    <div class="input-left">
                                        <div class="agp-input">  
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} /> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Preço de: </div>  
                                    <div class="input"> <input type="text" value={precoDE} onChange={e => setPrecoDE(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Preço por: </div>  
                                    <div class="input"> <input type="text" value={precoPOR} onChange={e => setPrecoPOR(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)} /> </div> 
                                </div>
                            </div>
                        </div>
                        <div class="input-down">
                            <div class="agp-input-img">
                                <div class="corse-student"> Imagem: </div>  
                                <div class="input2"> <input type="text" value={imgproduto} onChange={e => setImgproduto(e.target.value)} /> </div>  
                            </div>
                            <div class="agp-input-desc">
                                <div class="class-student-desc"> Descrição: </div>  
                                <div class="input"> <textarea type="text" value={dsproduto} onChange={e => setDsproduto(e.target.value)} /> </div> 
                            </div>
                        </div>
                    </div>
                    <div class="button-create"> <button onClick={inserir}> {idAlterando == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                    </div>
                </div>

                    <div class="student-registered-box">
                       <div class="row-bar">
                           <div class="bar-new-student"> </div>
                           <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>

                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>

                            {produtos.map((item, i) =>

                                <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                    <td> <img src={item.img_produto} alt='' width='50px' height='50px'></img> </td>
                                    <td> {item.id_produto} </td>
                                    <td title={item.nm_produto}> {item.nm_produto != null && item.nm_produto.length >= 25 
                                            ? item.nm_produto.substr(0, 25) + '...' 
                                            : item.nm_produto} </td>
                                    <td> {item.ds_categoria} </td>
                                    <td> {item.vl_preco_de} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className="coluna-acao"> <button onClick={() => remover(item.id_produto)}> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>
                            )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
