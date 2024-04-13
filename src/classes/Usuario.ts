const usuarios: Usuario[] = [];

export class Usuario { 
  nome: string;
  cpf: string;

  constructor(nome: string, cpf: string) {
    this.nome = nome;
    this.cpf = cpf;
  }

   static cadastrarUsuario(nome: string, cpf: string): void {
    const newUsuario = new Usuario(nome, cpf);
    usuarios.push(newUsuario);
  }

   static listarUsuario(): Usuario[] {
    return usuarios;
  }

  static buscarUsuario(nome: string): Usuario | string {
    for (const usuario of usuarios) {
      if(usuario.nome === nome) {
        return usuario;
      }
    }
    return "Cliente não encontrado cadastre o novo cliente.";
  }

  static deletarUsuario(nome: string): void {
    for (let i = 0; i < usuarios.length; i++) {
      if(usuarios[i].nome === nome) {
        usuarios.splice(i, 1);
        break;
      }
    }
  }
}