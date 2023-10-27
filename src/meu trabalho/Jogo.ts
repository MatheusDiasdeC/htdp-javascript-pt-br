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

//-- Criar Imagens --
//Criar Tartaruga
const IMG_TARTARUGA_LESTE = carregarImagem(imgTartarugaUrl, 110, 100)
const IMG_TARTARUGA_OESTE = espelhar(IMG_TARTARUGA_LESTE)

//Criar Caranguejo
const IMG_CARANGUEJO = carregarImagem(imgCaranguejoUrl, 110, 100)

//Criar Gaivota
const IMG_GAIVOTA_OESTE = carregarImagem(imgGaivotaUrl, 100, 100)
const IMG_GAIVOTA_LESTE = espelhar(IMG_GAIVOTA_OESTE)

//Criar Coração
const  IMG_CORACAO = carregarImagem(imgCoracaoUrl, 100, 100)


//-----------------------------------------------------------------------------------------------------------

//--Constantes de Posição--
//Ver Imagem na Tela (Teste)
IMG_CARANGUEJO.desenha()


//Altura Inicial de Tartaruga
const Y_INICIAL_TARTARUGA = ALTURA / 2

//Altura Inicial de Caranguejo
const Y_INICIAL_CARANGUEJO = 4 * (ALTURA / 5)

//Altura Inicial de Gaivota
const Y_INICIAL_GAIVOTA = 4 * (ALTURA / 5)

//Limites da Tartaruga
const LIMITE_ESQUERDA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_DIREITA_TARTARUGA = LARGURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_BAIXO_TARTARUGA = ALTURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
const LIMITE_CIMA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2

//Limites dos Caranguejos
const LIMITE_ESQUERDA_CARANGUEJO = 0 + larguraImagem(IMG_CARANGUEJO) / 2
const LIMITE_DIREITA_CARANGUEJO = LARGURA - larguraImagem(IMG_CARANGUEJO) / 2
const LIMITE_BAIXO_CARANGUEJO = ALTURA - larguraImagem(IMG_CARANGUEJO) / 2
const LIMITE_CIMA_CARANGUEJO = 0 + larguraImagem(IMG_CARANGUEJO) / 2

//Limites das Gaivotas
const LIMITE_ESQUERDA_GAIVOTA = 0 + larguraImagem(IMG_GAIVOTA_LESTE) / 2
const LIMITE_DIREITA_GAIVOTA = LARGURA - larguraImagem(IMG_GAIVOTA_LESTE) / 2
const LIMITE_BAIXO_GAIVOTA = ALTURA - larguraImagem(IMG_GAIVOTA_LESTE) / 2
const LIMITE_CIMA_GAIVOTA = 0 + larguraImagem(IMG_GAIVOTA_LESTE) / 2

//Velocidade Inicial
const D_PADRAO = 3


//-----------------------------------------------------------------------------------------------------------
//-- Interfaces --

//Definição de Dados
interface Jogo {
    tart: Personagem,
    caras: Personagem[],
    gaivas: Personagem[],
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

const CARA_INICIAL = {
    x: 2 * (LIMITE_ESQUERDA_CARANGUEJO / 5),
    y: 4 * (ALTURA / 5),
    dx: 0,
    dy: D_PADRAO,

    limiteCima: LIMITE_CIMA_CARANGUEJO,
    limiteBaixo: LIMITE_BAIXO_CARANGUEJO,
    limiteEsquerdo: LIMITE_ESQUERDA_CARANGUEJO,
    limiteDireito: LIMITE_DIREITA_CARANGUEJO

    //Alterar para "Limites Caranjguejo"
}

const GAIVOTA_INICIAL = {
    x: 4 * (LIMITE_ESQUERDA_GAIVOTA / 5),
    y: 4 * (ALTURA / 5),
    dx: D_PADRAO,
    dy: D_PADRAO,

    limiteCima: LIMITE_CIMA_GAIVOTA,
    limiteBaixo: LIMITE_BAIXO_GAIVOTA,
    limiteEsquerdo: LIMITE_ESQUERDA_GAIVOTA,
    limiteDireito: LIMITE_DIREITA_GAIVOTA

    //Alterar para "Limites Gaivota"
}

//EXEMPLOS
////const CARA_VERTICAL = {x: 2 * (LARGURA / 5), y: LIMITE_CIMA_TARTARUGA, dx: 0, dy: D_PADRAO}
////const CARA_HORIZONTAL = {X: 2 * (LARGURA / 5), y: ALTURA / 3, dx: D_PADRAO, dy: 0}

interface Bloco{
    x: number,
    y: number,

    altura: number,
    largura: number
}

interface ItemVida {
    x: number,
    y: number
}

//-----------------------------------------------------------------------------------------------------------

//Cria um "objeto" T (Tartaruga), C (Caranguejo) e G (Gaivota)
function makeTartaruga(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x,
            y: y,
            dx: dx,
            dy: dy,

            limiteCima: LIMITE_CIMA_TARTARUGA,
            limiteBaixo: LIMITE_BAIXO_TARTARUGA,
            limiteEsquerdo: LIMITE_ESQUERDA_TARTARUGA,
            limiteDireito: LIMITE_DIREITA_TARTARUGA};
}

function makeCaranguejo(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x,
            y: y,
            dx: dx,
            dy: dy,

            limiteCima: LIMITE_CIMA_CARANGUEJO,
            limiteBaixo: LIMITE_BAIXO_CARANGUEJO,
            limiteEsquerdo: LIMITE_ESQUERDA_CARANGUEJO,
            limiteDireito: LIMITE_DIREITA_CARANGUEJO};
}

function makeGaivota(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x,
            y: y,
            dx: dx,
            dy: dy,
            
            limiteCima: LIMITE_CIMA_GAIVOTA,
            limiteBaixo: LIMITE_BAIXO_GAIVOTA,
            limiteEsquerdo: LIMITE_ESQUERDA_GAIVOTA,
            limiteDireito: LIMITE_DIREITA_GAIVOTA};
}

//Posições Iniciais de T
const TARTARUGA_INICIAL = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, D_PADRAO, 0)
    //Após 1 Tic
const TARTARUGA_INICIAL2 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA + D_PADRAO, Y_INICIAL_TARTARUGA, D_PADRAO, 0)

const TARTARUGA0 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 3, 4)
const TARTARUGA1 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA + 3, Y_INICIAL_TARTARUGA + 4, 3, 4)

//Posições Iniciais de C
const CARANGUEJO_01_INICIAL = makeCaranguejo(2 * (LARGURA / 5), Y_INICIAL_CARANGUEJO, 0, D_PADRAO)
const Caranguejo_01_POSTERIOR = makeCaranguejo(2 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_CARANGUEJO, 0, D_PADRAO)

const CARANGUEJO_02_INICIAL = makeCaranguejo(3 * (LARGURA / 5), Y_INICIAL_CARANGUEJO, 0, D_PADRAO)
const Caranguejo_02_POSTERIOR = makeCaranguejo(3 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_CARANGUEJO, 0, D_PADRAO)

const CARANGUEJO_03_INICIAL = makeCaranguejo(LARGURA / 5, Y_INICIAL_CARANGUEJO, D_PADRAO, 0)
const Caranguejo_03_POSTERIOR = makeCaranguejo(LARGURA / 5 + D_PADRAO, Y_INICIAL_CARANGUEJO, D_PADRAO, 0)

//Posições Iniciais de G
const GAIVOTA_01_INICIAL = makeGaivota(4* (LARGURA / 5), Y_INICIAL_GAIVOTA, 0, D_PADRAO)
const GAIVOTA_01_POSTERIOR = makeGaivota(4 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_GAIVOTA, 0, D_PADRAO)

//-----------------------------------------------------------------------------------------------------------
//Estou trabalhando AQUI!

//Movimento de T ao chegar no final
const TARTARUGA_FIM = makeTartaruga(LIMITE_DIREITA_TARTARUGA + 1, LIMITE_BAIXO_TARTARUGA, 3, 0)
const TARTARUGA_VIRANDO = makeTartaruga(LIMITE_DIREITA_TARTARUGA, LIMITE_BAIXO_TARTARUGA, -3, 0)
const TARTARUGA_VOLTANDO = makeTartaruga(LARGURA / 2, LIMITE_BAIXO_TARTARUGA, -3, 0)

//Movimento de C ao chegar no final
////const CARANGUEJO_FIM = makeCaranguejo(LIMITE_DIREITA_TARTARUGA + 1, LIMITE_BAIXO_TARTARUGA, 3, 0)
//o QUE É ISSO? ^

//Mover T

//T -> t (Corrigir) (OK?)
//Colocar os Testes (OK?)
function moveT(tuga: Personagem): Personagem {
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
                expect(moveT(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA - 1, ALTURA / 2, -3, 0)))
                    .toStrictEqual(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, ALTURA / 2, 3, 0));
            });
            test('move vaca limite baixo', () => {
                expect(moveT(makeTartaruga(LARGURA / 2, LIMITE_BAIXO_TARTARUGA+1, 0, 3)))
                    .toStrictEqual(makeTartaruga(LARGURA/2, LIMITE_BAIXO_TARTARUGA, 0, -3));
            });
            test('move vaca limite cima', () => {
                expect(moveT(makeTartaruga(LARGURA/2, LIMITE_CIMA_TARTARUGA-1, 0, -3)))
                    .toStrictEqual(makeTartaruga(LARGURA/2, LIMITE_CIMA_TARTARUGA, 0, 3));
            });
        });
})

function desenhaT(tuga: Personagem): Imagem {
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


function trataTeclaTartaruga(tuga: Personagem, tecla: string): Personagem {
    if (tecla == "ArrowRight") {
        return {...tuga, dx: D_PADRAO, dy: 0}
    }
    if (tecla == "ArrowLeft") {
        return {...tuga, dx: -D_PADRAO, dy: 0}
    }
    if (tecla == "ArrowDown") {
        return {...tuga, dx: 0, dy: D_PADRAO}
    }
    if (tecla == "ArrowUp") {
        return {...tuga, dx: 0, dy: -D_PADRAO}
    }
    return tuga;
}


//-----------------------------------------------------------------------------------------------------------


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