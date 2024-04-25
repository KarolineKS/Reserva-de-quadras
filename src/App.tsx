import { useEffect, useState } from 'react';
import { Usuario } from './classes/Usuario';
import { Quadra } from './classes/Quadra';
import { Reserva } from './classes/Reserva';
import './output.css'

function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cod, setCod] = useState('');
  const [tipo, setTipo] = useState('');
  const [valorHora, setValorHora] = useState(0);
  const [tempoReserva, setTempoReserva] = useState(0);
  const [horaEntrada, setHoraEntrada] = useState(0);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [quadras, setQuadras] = useState<Quadra[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [horario, setHorario] = useState(0);
  const [quadrasOcupadas, setQuadrasOcupadas] = useState<
    { cod: string; status: string; tipo: string }[]
  >([]);
  const [resultadoBusca, setResultadoBusca] = useState<Reserva | string>('');
  const [nomePesquisa, setNomePesquisa] = useState('');

  useEffect(() => {
    const usuarios = Usuario.listarUsuario();
    setUsuarios(usuarios);

    const quadras = Quadra.listarQuadras();
    setQuadras(quadras);

    const reservas = Reserva.listarReservas();
    setReservas(reservas);
  }, []);

  useEffect(() => {
    const quadrasOcupadas = Reserva.listarQuadrasLivresOcupadas(horario);
    setQuadrasOcupadas(quadrasOcupadas);
  }, [horario]);

  useEffect(() => {
    const reservas = Reserva.listarReservas();
    setReservas(reservas);
  }, [reservas]);

  const cadastrarUsuario = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Usuario.cadastrarUsuario(nome, cpf);
    setNome('');
    setCpf('');
  };

  const cadastrarQuadra = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Quadra.cadastrarQuadra(cod, tipo, valorHora);
    setCod('');
    setTipo('');
    setValorHora(0);
  };

  const cadastrarReserva = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const quadra = Quadra.buscarQuadraCod(cod);
    if (quadra) {
      Reserva.cadastrarReserva(quadra, nome, tempoReserva, horaEntrada);
    }
    setCod('');
    setNome('');
    setTempoReserva(0);
    setHoraEntrada(0);
  };

  const pesquisarReserva = (nome: string) => {
    const resultado = Reserva.buscarReservaUsuario(nome);
    setResultadoBusca(resultado);
  };

  const cancelarReserva = (nome: string) => {
    Reserva.cancelarReserva(nome);
    const reservasAtualizadas = [...Reserva.listarReservas()];
    setReservas(reservasAtualizadas);
  };

  return (
    <main>
      <h1 className='titulo'>Reserva de Quadras Esportivas</h1>
      <form className='formulario'>
        <div className='cadastro'>
        <h2 className='subtitulo'>Cadastrar Cliente</h2>
          <div>
            <label htmlFor="cliente">Nome do cliente: </label>
                    <input id='cliente'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do cliente"
                    />
          </div>
        <div>
          <label htmlFor="cpf">CPF: </label>
          <input
          id='cpf'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
          />
        </div>
        <button onClick={(event) => cadastrarUsuario(event)}>
          Cadastrar cliente
        </button>
        </div>
        <div className='cadastro'>
          <h2 className='subtitulo'>Cadastrar Quadra</h2>
          <div>
            <label htmlFor="cod">Código da quadra: </label>
            <input
              value={cod}
              onChange={(e) => setCod(e.target.value)}
              placeholder="Código da quadra"
            />
          </div>
          <div>
            <label htmlFor="tipo">Tipo: </label>
            <input
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo"
            />
          </div>
          <div>
            <label htmlFor="valorHora">Valor por hora: </label>
            <input
              value={valorHora}
              onChange={(e) => setValorHora(Number(e.target.value))}
              placeholder="Valor por Hora"
            />
          </div>
          <button onClick={cadastrarQuadra}>Cadastrar quadra</button>
        </div>

        <div className='cadastro'>
          <h2 className='subtitulo'>Cadastrar Reserva</h2>
          <div>
            <label htmlFor="nomeCliente">Nome do cliente: </label>
            <input
              id="nomeCliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Informe o nome do Cliente"
            />
          </div>
          <div>
            <label htmlFor="codigoQuadra">Código da quadra: </label>
            <input
              id="codigoQuadra"
              value={cod}
              onChange={(e) => setCod(e.target.value)}
              placeholder="Código da Quadra"
            />
          </div>
          <div>
            <label htmlFor="tempoReserva">Tempo de Reserva em horas: </label>
            <input
              id="tempoReserva"
              value={tempoReserva}
              onChange={(e) => setTempoReserva(Number(e.target.value))}
              placeholder="Tempo de Reserva"
            />
          </div>
          <div>
            <label htmlFor="horaEntrada">Hora de entrada: </label>
            <input
              id="horaEntrada"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(Number(e.target.value))}
              placeholder="Hora de Entrada"
            />
          </div>
          <button onClick={(event) => cadastrarReserva(event)}>
            Cadastrar reserva
          </button>
        </div>
      </form>
      <section className='cadastrados'>
        <section>
          <h2 className='subtitulo'>Clientes Cadastrados</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                    </tr>
                  </thead>
                </table>
            {usuarios.map((usuario) => (
             
                <table>
                  <tbody>
                    <tr>
                          <td>{usuario.nome}</td>
                          <td>{usuario.cpf}</td>
                    </tr>
                  </tbody>
                </table>
             
            ))}
        </section>
        <section>
          <h2 className='subtitulo'>Quadras Cadastradas</h2>
        
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Quadra</th>
                    <th>Valor por Hora</th>
                  </tr>
                </thead>
              </table>
            {quadras.map((quadra) => (
              <table>
                <tbody>
                  <tr>
                    <td>{quadra.cod}</td>
                    <td>{quadra.tipo}</td>
                    <td>R${(quadra.valorHora).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            ))}
        
        </section>
        <section>
          <h2 className='subtitulo'>Reservas Cadastradas</h2>
        
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Quadra</th>
                    <th>Data</th>
                    <th>Hora Entrada</th>
                    <th>Hora Saída</th>
                    <th>Total a pagar</th>
                  </tr>
                </thead>
              </table>
            {reservas.map((reserva) => (
              <table>
                <tbody>
                  <tr>
                    <td>{reserva.usuario}</td>
                    <td>{reserva.quadra.tipo}</td>
                    <td>{reserva.data}</td>
                    <td>{reserva.horaEntrada}hr</td>
                    <td>{reserva.horaSaida}hr</td>
                    <td>R${reserva.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            ))}
        
        </section>
      </section>
      <section className='informacoes'>
      <div>
            <h2 className='subtitulo'>Lista de quadras ocupadas e livres</h2>
            <label htmlFor="horario">Informe o horário: </label>
            <input
              type="number"
              placeholder="Informe o horário"
              onChange={(e) => setHorario(Number(e.target.value))}
            />
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Quadra</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quadrasOcupadas.map((quadra) => (
                  <tr key={quadra.cod}>
                    <td>{quadra.cod}</td>
                    <td>{quadra.tipo}</td>
                    <td>{quadra.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
          <h2 className='subtitulo'>Pesquisar reserva</h2>
            <label htmlFor="cliente">Informe o nome do cliente: </label>
            <input
              type="text"
              placeholder="Informe o nome do cliente"
              onChange={(e) => setNomePesquisa(e.target.value)}
            />
            <button onClick={() => pesquisarReserva(nomePesquisa)}>
              Pesquisar
            </button>
          {typeof resultadoBusca === 'string' ? (
            <p>{resultadoBusca}</p>
          ) : (
            <p>
              {resultadoBusca.usuario} - {resultadoBusca.quadra.tipo} -{' '}
              {resultadoBusca.data} - {resultadoBusca.horaEntrada} -{' '}
              {resultadoBusca.horaSaida}
            </p>
          )}
          </div>
          <div>
            <h2 className='subtitulo'>Cancelar Reserva</h2>
            <label htmlFor="cliente">Informe o nome do cliente: </label>
            <input
              type="text"
              placeholder="Informe o nome do cliente"
              onChange={(e) => setNomePesquisa(e.target.value)}
            />
            <button onClick={() => cancelarReserva(nomePesquisa)}>
              Cancelar Reserva
            </button>
          </div>
      </section>
    </main>
  );
}

export default App;
