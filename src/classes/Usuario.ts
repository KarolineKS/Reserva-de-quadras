const usuarios: Usuario[] = [];

export class Usuario { 
  nome: string;
  cpf: string;

  constructor(nome: string, cpf: string) {
    this.nome = nome;
    this.cpf = cpf;
  }

  static cadastrarUsuario(nome: string, cpf: string): { usuario?: Usuario, mensagem: string } {
    const existingUsuario = this.buscarUsuario(nome);
    if (existingUsuario instanceof Usuario) {
      return { mensagem: 'Um usuário com o mesmo nome já existe' };
    }

    const newUsuario = new Usuario(nome, cpf);
    usuarios.push(newUsuario);
    return { usuario: newUsuario, mensagem: 'Usuário cadastrado com sucesso' };
  }

  static listarUsuario(): Usuario[] {
    return usuarios;
  }

  static buscarUsuario(nome: string): Usuario | { mensagem: string } {
    for (const usuario of usuarios) {
      if(usuario.nome === nome) {
        return usuario;
      }
    }
    return { mensagem: 'Cliente não encontrado, cadastre o novo cliente.' };
  }

  static deletarUsuario(nome: string): { mensagem: string } {
    for (let i = 0; i < usuarios.length; i++) {
      if(usuarios[i].nome === nome) {
        usuarios.splice(i, 1);
        return { mensagem: 'Usuário deletado com sucesso' };
      }
    }
    return { mensagem: 'Usuário não encontrado' };
  }
}