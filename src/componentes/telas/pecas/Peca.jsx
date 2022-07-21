import { useState, useEffect } from 'react';
import PecaContext from './PecaContext';
import Tabela from './Tabela';
import Form from './Form'

function Peca() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", nro_cavidade : "", maquina : ""
    })
	
    const [listaMaquinas, setListaMaquinas] = useState ([]);

   const recuperar = async codigo => {    
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/pecas/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/pecas`, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto),
            }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                });
        } catch (err) {
            console.error(err.message);
        }       
        recuperarPecas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }
    const recuperaMaquinas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/maquinas`)
            .then(response => response.json())
            .then(data => setListaMaquinas(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }
    const recuperarPecas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/pecas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/pecas/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperarPecas();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaMaquinas();
        recuperarPecas();
    }, []);

    return (
        <PecaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaMaquinas,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange, listaMaquinas
            }
        }>
            <Tabela />
            <Form />
        </PecaContext.Provider>
    );
}

export default Peca;
