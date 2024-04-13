import { useEffect, useState } from 'react';
import { Usuario } from './classes/Usuario';
import { Quadra } from './classes/Quadra';
import { Reserva } from './classes/Reserva';

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
      <form>
        <h1>Reserva de Quadras Esportivas</h1>
        <h2>Cadastrar Cliente</h2>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
        />
        <input
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
        />
        <button onClick={(event) => cadastrarUsuario(event)}>
          Cadastrar cliente
        </button>

        <h2>Cadastrar Quadra</h2>
        <input
          value={cod}
          onChange={(e) => setCod(e.target.value)}
          placeholder="Código da quadra"
        />
        <input
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          placeholder="Tipo"
        />
        <input
          value={valorHora}
          onChange={(e) => setValorHora(Number(e.target.value))}
          placeholder="Valor por Hora"
        />
        <button onClick={cadastrarQuadra}>Cadastrar quadra</button>

        <h2>Cadastrar Reserva</h2>
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
      </form>
      <section>
        <h2>Clientes Cadastrados</h2>
          {usuarios.map((usuario) => (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                </tr>
              </thead>
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
        <h2>Quadras Cadastradas</h2>
        
          {quadras.map((quadra) => (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Quadra</th>
                  <th>Valor por Hora</th>
                </tr>
              </thead>
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
        <h2>Reservas Cadastradas</h2>
        
          {reservas.map((reserva) => (
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Quadra</th>
                  <th>Data</th>
                  <th>Hora de Entrada</th>
                  <th>Hora de Saída</th>
                  <th>Total a pagar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reserva.usuario}</td>
                  <td>{reserva.quadra.tipo}</td>
                  <td>{reserva.data}</td>
                  <td>{reserva.horaEntrada}</td>
                  <td>{reserva.horaSaida}</td>
                  <td>R${reserva.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          ))}
        
      </section>
      <section>
        <h2>Cancelar Reserva</h2>
        <input
          type="text"
          placeholder="Informe o nome do cliente"
          onChange={(e) => setNomePesquisa(e.target.value)}
        />
        <button onClick={() => cancelarReserva(nomePesquisa)}>
          Cancelar Reserva
        </button>
      </section>
      <section>
        <h1>Relação de quadras ocupadas e livres</h1>
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
      </section>
      <section>
        <h1>Pesquisar reserva</h1>
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
      </section>
    </main>
  );
}

export default App;
