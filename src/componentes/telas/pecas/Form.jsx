import { useContext } from 'react'
import Alerta from '../../Alerta';
import PecaContext from './PecaContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaMaquinas } = useContext(PecaContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Peças</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo Nome!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtDescricao"
                                    name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo Descrição!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNro_cavidade" className="form-label">
                                    Numero de Cavidades
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtNro_cavidade"
                                    maxLength="4"
                                    name="nro_cavidade"
                                    value={objeto.nro_cavidade}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo Numero de Cavidade!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectMaquina" className="form-label">
                                    Maquina
                                </label>
                                <select
                                    
                                    className="form-control"
                                    id="txtMaquina"
                                    name="maquina"
                                    value={objeto.maquina}
                                    onChange={handleChange}
                                    required>
                                    <option disabled="true" value="">(Selecione a maquina)</option>
                                    {listaMaquinas.map( (maquina) => (
                                        <option key={maquina.codigo}
                                        value={maquina.codigo}>
                                        {maquina.nome}
                                        </option>
                                    ))} </select>
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo Maquina!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Form;