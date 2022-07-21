import { useContext } from 'react';
import PecaContext from './PecaContext';
import Alerta from '../../Alerta';


function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, setEditar, recuperar,
        remover } = useContext(PecaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Peças</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({
                        codigo: 0,
                        nome: "",
                        descricao: "",
                        nro_cavidade: "",
                        maquina: ""
                    });
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum peça encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Numero de Cavidades</th>
                            <th scope="col">Maquina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td scope="row">{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.nro_cavidade}</td>
                                <td>{objeto.nomemaquina}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;