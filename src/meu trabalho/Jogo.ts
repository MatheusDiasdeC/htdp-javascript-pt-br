import { Imagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem } from "../../lib/image"
import { reactor } from "../../lib/universe";
import { testes } from "../../lib/utils";
import imgTartarugaUrl from "./Tartaruga.png";
import imgCaranguejoUrl from "./Caranguejo.png";
import imgGaivotaUrl from "./Gaivota.png";
import imgCoracaoUrl from "./Coracao.png";

//Coisas para fazer o trabalho funcionar:
// - Como ativar o servidor -> readme
// - Como fazer os commits -> Nessa barra ateral -> Ícone que parece um grafo -> FAÇA os COMMITS!




//Criação da Tela
const [LARGURA, ALTURA] = [900, 600]

const TELA = cenaVazia(LARGURA, ALTURA)


//-----------------------------------------------------------------------------------------------------------


//Criar Tartaruga
const IMG_TARTARUGA_LESTE = carregarImagem(imgTartarugaUrl, 110, 100)
const IMG_TARTARUGA_OESTE = espelhar(IMG_TARTARUGA_LESTE)

//Criar Caranguejo
const IMG_CARANGUEJO = carregarImagem(imgCaranguejoUrl, 110, 100)

//Criar Gaivota
const IMG_GAIVOTA = carregarImagem(imgGaivotaUrl, 100, 100)

//Criar Coração
const  IMG_CORACAO = carregarImagem(imgCoracaoUrl, 100, 100)

//-----------------------------------------------------------------------------------------------------------


//Ver Imagem na Tela (Teste)
//IMG_CARANGUEJO.desenha()


//Altura Inicial de Tartaruga
const Y_INICIAL_TARTARUGA = ALTURA / 2

//Altura Inicial de Caranguejo
const Y_INICIAL_CARANGUEJO = 4 * (ALTURA / 5)

//Altura Inicial de Gaivota

//Limites da Tartaruga
const LIMITE_ESQUERDA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_DIREITA_TARTARUGA = LARGURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_BAIXO_TARTARUGA = ALTURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_CIMA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2

//Velocidade Inicial
const D_PADRAO = 3


//Definição de Dados
interface Jogo {
    tart: Tartaruga,
    caras: Caranguejo[],
    gaivas: Gaivota[],
    itensVida: ItemVida[],
    blocos: Bloco[],
    vidas: number
}

//interface genérica para todos os personagens. Vai substituitir todas as coisas que se movem.
interface Personagem {
    x: number,
    y: number,
    dx: number,
    dy: number,
    
    limiteCima: number,
    limiteBaixo: number,
    limiteEsquerdo: number,
    limiteDireito: number
}


//EXEMPLOS
//const TART_INICIAL = {x: LIMITE_ESQUERDA_TARTARUGA, y: ALTURA/2, dx: 0, dy: 0}

const TART_INICIAL = {
    x: LIMITE_ESQUERDA_TARTARUGA,
    y: ALTURA/2,
    dx: 0,
    dy: 0,

    limiteCima: LIMITE_CIMA_TARTARUGA,
    limiteBaixo: LIMITE_BAIXO_TARTARUGA,
    limiteEsquerdo: LIMITE_ESQUERDA_TARTARUGA,
    limiteDireito: LIMITE_DIREITA_TARTARUGA
}
//dx e dy mudam no trata tecla

//EXEMPLOS
const CARA_VERTICAL = {x: 2 * (LARGURA / 5), y: LIMITE_CIMA_TARTARUGA, dx: 0, dy: D_PADRAO}
const CARA_HORIZONTAL = {X: 2 * (LARGURA / 5), y: ALTURA / 3, dx: D_PADRAO, dy: 0}




interface Bloco{
    x: number,
    y: number
}

interface ItemVida {
    x: number,
    y: number
}



//Cria um "objeto" T (Tartaruga) e C (Caranguejo)
function makeTartaruga(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x, y: y, dx: dx, dy: dy,
             limiteCima:  LIMITE_CIMA_TARTARUGA, limiteBaixo: LIMITE_BAIXO_TARTARUGA, limiteEsquerdo: LIMITE_ESQUERDA_TARTARUGA, limiteDireito: LIMITE_DIREITA_TARTARUGA};
}

function makeCaranguejo(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x, y: y, dx: dx, dy: dy,
             limiteCima:  LIMITE_CIMA_TARTARUGA, limiteBaixo: LIMITE_BAIXO_TARTARUGA, limiteEsquerdo: LIMITE_ESQUERDA_TARTARUGA, limiteDireito: LIMITE_DIREITA_TARTARUGA};
             //Criar limites para caranguejos e gaivotas
}

//Posições Iniciais de T
const TARTARUGA_INICIAL = makeT(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, DX_PADRAO, 0)
const TARTARUGA_INICIAL2 = makeT(LIMITE_ESQUERDA_TARTARUGA + DX_PADRAO, Y_INICIAL_TARTARUGA, DX_PADRAO, 0)

const TARTARUGA0 = makeT(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 3, 4)
const TARTARUGA1 = makeT(LIMITE_ESQUERDA_TARTARUGA + 3, Y_INICIAL_TARTARUGA + 4, 3, 4)


//const CARANGUEJO_INICIAL = makeC()

//const   CARANGUEJO_INICIAL = makeC()     !!!

// const T_MEIO = (x: LARGURA/2, y: 0, dx: 3, dy:0}

const TARTARUGA_FIM = makeT(LIMITE_DIREITA_TARTARUGA + 1, LIMITE_BAIXO_TARTARUGA, 3, 0)
const TARTARUGA_VIRANDO = makeT(LIMITE_DIREITA_TARTARUGA, LIMITE_BAIXO_TARTARUGA, -3, 0)
const TARTARUGA_VOLTANDO = makeT(LARGURA / 2, LIMITE_BAIXO_TARTARUGA, -3, 0)

//Mover T

//T -> t (Corrigir) (OK?)
//Colocar os Testes (OK?)
function moveT(tuga: Tartaruga): Tartaruga {
    if (tuga.x > tuga.limiteDireito) {
        return { ...tuga, x: LIMITE_DIREITA_TARTARUGA, dx: -tuga.dx }
    } //... -> copia o objeto que vc quer copiar, e tudo o que vem depois da vírgula é o que você quer modificar
    if (tuga.x < LIMITE_ESQUERDA_TARTARUGA) {
        return { ...tuga, x: LIMITE_ESQUERDA_TARTARUGA, dx: -tuga.dx }
    }
    if (tuga.y > LIMITE_BAIXO_TARTARUGA) {
        return { ...tuga, y: LIMITE_BAIXO_TARTARUGA, dy: -tuga.dy }
    }
    if (tuga.y < LIMITE_CIMA_TARTARUGA) {
        return { ...tuga, y: LIMITE_CIMA_TARTARUGA, dy: -tuga.dy }
    }
    return { ...tuga, x: tuga.x + tuga.dx, y: tuga.y + tuga.dy }
}

testes(() => {
    describe('testes de moveT', () => {
            test('move vaca inicial', () => {
                expect(moveT(TARTARUGA0)).toStrictEqual(TARTARUGA1);
            });
            test('move vaca limite direito', () => {
                expect(moveT(TARTARUGA_FIM)).toStrictEqual(TARTARUGA_VIRANDO);
            });
            test('move vaca limite esquerdo', () => {
                expect(moveT(makeT(LIMITE_ESQUERDA_TARTARUGA - 1, ALTURA / 2, -3, 0)))
                    .toStrictEqual(makeT(LIMITE_ESQUERDA_TARTARUGA, ALTURA / 2, 3, 0));
            });
            test('move vaca limite baixo', () => {
                expect(moveT(makeT(LARGURA / 2, LIMITE_BAIXO_TARTARUGA+1, 0, 3)))
                    .toStrictEqual(makeT(LARGURA/2, LIMITE_BAIXO_TARTARUGA, 0, -3));
            });
            test('move vaca limite cima', () => {
                expect(moveT(makeT(LARGURA/2, LIMITE_CIMA_TARTARUGA-1, 0, -3)))
                    .toStrictEqual(makeT(LARGURA/2, LIMITE_CIMA_TARTARUGA, 0, 3));
            });
        });
})

function desenhaT(tuga: Tartaruga): Imagem {
    return colocarImagem(tuga.dx < 0? IMG_TARTARUGA_OESTE: IMG_TARTARUGA_LESTE, tuga.x, tuga.y, TELA);
}
testes(() => {
    describe('testes de desenhaT', () => {
        test('desenha vaca inicial', () => {
            expect(desenhaT(TARTARUGA0))
                .toStrictEqual(colocarImagem(IMG_TARTARUGA_LESTE, TARTARUGA0.x, TARTARUGA0.y, TELA));
        });
    });
})


function trataTeclaTartaruga(tuga: Tartaruga, tecla: string): Tartaruga {
    if (tecla == "ArrowRight") {
        return {...tuga, dx: DX_PADRAO, dy: 0}
    }
    if (tecla == "ArrowLeft") {
        return {...tuga, dx: -DX_PADRAO, dy: 0}
    }
    if (tecla == "ArrowDown") {
        return {...tuga, dx: 0, dy: DX_PADRAO}
    }
    if (tecla == "ArrowUp") {
        return {...tuga, dx: 0, dy: -DX_PADRAO}
    }
    return tuga;
}





function main() {
    reactor(TARTARUGA_INICIAL,
        {
            aCadaTick: moveT,
            desenhar: desenhaT,
            quandoTecla: trataTeclaTartaruga,
        })
}

main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html

//linha 20 -> Resolver problema