import { Quadra } from "./Quadra";

const reservas: Reserva[] = [];

export class Reserva {
  cod: string;
  data: string;
  tempoReserva: number;
  horaEntrada: number;
  horaSaida: number;
  quadra: Quadra;
  usuario: string;
  tipo: string;
  total: number;

  constructor(quadra: Quadra, usuario: string, tempoReserva: number, horarioEntrada: number) {
    this.cod = quadra.cod;
    this.data = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    this.quadra = quadra;  
    this.usuario = usuario;
    this.tempoReserva = tempoReserva;
    this.horaEntrada = horarioEntrada;
    this.horaSaida =  this.horaEntrada + tempoReserva;
    this.tipo = quadra.tipo;
    this.total = this.tempoReserva * quadra.valorHora;
   }

   static cadastrarReserva(quadra: Quadra,  usuario: string, tempoReserva: number, horaEntrada: number): { reserva?: Reserva, mensagem: string } {
    if (this.isQuadraReservada(quadra.cod, horaEntrada)) {
      return { mensagem: 'A quadra já está reservada para este horário' };
    }

    const newReserva = new Reserva(quadra, usuario, tempoReserva, horaEntrada);
    reservas.push(newReserva);
    return { reserva: newReserva, mensagem: 'Reserva cadastrada com sucesso' };
  }

  static listarReservas(): Reserva[] {
    return reservas;
  }

  static cancelarReserva(usuario: string): { mensagem: string } {
    for (let i = 0; i < reservas.length; i++) {
      if(reservas[i].usuario === usuario) {
        reservas.splice(i, 1);
        return { mensagem: 'Reserva cancelada com sucesso' };
      }
    }
    return { mensagem: 'Não foi encontrada nenhuma reserva para este usuário' };
  }

  static buscarReservaUsuario(usuario: string): { reserva?: Reserva, mensagem: string } {
    for (const reserva of reservas) {
      if(reserva.usuario === usuario) {
        return { reserva, mensagem: 'Reserva encontrada' };
      }
    }
    return { mensagem: 'Não possuímos reservas em seu nome.' };
  }

  static isQuadraReservada(cod: string, horario: number): boolean {
    for (const reserva of reservas) {
      if (reserva.quadra.cod === cod && reserva.horaEntrada <= horario && horario <= reserva.horaSaida) {
        return true;
      }
    }
    return false;
  }

  static listarQuadrasLivresOcupadas(horario: number): { cod: string, status: string, tipo: string }[] {
    const quadras = Quadra.listarQuadras();
    return quadras.map(quadra => {
      const status = this.isQuadraReservada(quadra.cod, horario) ? 'Ocupada' : 'Livre';
      return { cod: quadra.cod, status, tipo: quadra.tipo};
    });
  }
}