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

    static cadastrarQuadra(cod: string,tipo: string, valorHora: number): Quadra{
        const newQuadra = new Quadra(cod, tipo, valorHora);
        quadras.push(newQuadra);
        return newQuadra;
    }

    static listarQuadras(): Quadra[] {
       return quadras;
    }

    static buscarQuadraCod(cod: string): Quadra | undefined {
        for (const quadra of quadras) {
            if (quadra.cod === cod) {
                return quadra;
            }
        }
        return undefined;
    }

}
