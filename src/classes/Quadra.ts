const quadras: Quadra[] = [];

export class Quadra {
    cod: string;
    tipo: string;
    valorHora: number;

    constructor(cod: string, tipo: string, valorHora: number) {
        this.cod = cod ;
        this.tipo = tipo;
        this.valorHora = valorHora;
    }

    static cadastrarQuadra(cod: string,tipo: string, valorHora: number): { quadra?: Quadra, mensagem: string } {
        if (!cod || !tipo || valorHora < 0) {
            return { mensagem: 'Valores inválidos fornecidos para cadastrarQuadra' };
        }

        const newQuadra = new Quadra(cod, tipo, valorHora);
        quadras.push(newQuadra);
        return { quadra: newQuadra, mensagem: 'Quadra cadastrada com sucesso' };
    }

    static listarQuadras(): Quadra[] {
       return quadras;
    }

    static buscarQuadraCod(cod: string): { quadra?: Quadra, mensagem: string } {
        const quadra = quadras.find(q => q.cod === cod);
        if (!quadra) {
            return { mensagem: 'Quadra não encontrada' };
        }
        return { quadra, mensagem: 'Quadra encontrada' };
    }
}