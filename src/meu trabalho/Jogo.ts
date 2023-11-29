import { Imagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem, sobrepor, texto } from "../../lib/image"
import { reactor } from "../../lib/universe";
import { testes } from "../../lib/utils";
import { ALTURA, D_PADRAO, FUNDO, IMG_CARANGUEJO, IMG_CORACAO, IMG_PRAIA, IMG_TARTARUGA_LESTE, IMG_TARTARUGA_OESTE, LARGURA, LIMITE_BAIXO_CARANGUEJO, LIMITE_BAIXO_GAIVOTA, LIMITE_BAIXO_TARTARUGA, LIMITE_CIMA_CARANGUEJO, LIMITE_CIMA_GAIVOTA, LIMITE_CIMA_TARTARUGA, LIMITE_DIREITA_CARANGUEJO, LIMITE_DIREITA_GAIVOTA, LIMITE_DIREITA_TARTARUGA, LIMITE_ESQUERDA_CARANGUEJO, LIMITE_ESQUERDA_GAIVOTA, LIMITE_ESQUERDA_TARTARUGA, TELA, Y_INICIAL_CARANGUEJO, Y_INICIAL_GAIVOTA, Y_INICIAL_TARTARUGA } from "./Constantes";
import { CARANGUEJO_01_INICIAL, CARANGUEJO_02_INICIAL, /*CARANGUEJO_03_INICIAL,*/ GAIVOTA_01_INICIAL, Personagem, TARTARUGA_INICIAL, desenhaCaranguejos, desenhaGaivotas, desenhaTartaruga, giraGaivota, movePersonagem } from "./Personagens";
import { distancia } from "./Utilidades";



//Coisas para fazer o trabalho funcionar:
// - Como ativar o servidor -> readme
// - Como fazer os commits -> Nessa barra ateral -> Ícone que parece um grafo -> FAÇA os COMMITS!



//--Constantes de Posição--
//Ver Imagem na Tela (Teste)
//IMG_CARANGUEJO.desenha()
//IMG_PRAIA.desenha()
//-----------------------------------------------------------------------------------------------------------
//-- Interfaces --

//Definição de Dados


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

const ItemVida1 = {x: ALTURA/2, y: LARGURA/2}
//-----------------------------------------------------------------------------------------------------------

export interface Jogo {
    tart: Personagem,
    caras: Personagem[],
    gaivas: Personagem[],
    itensVida: ItemVida[],
    blocos: Bloco[],
    vidas: number,

    gameOver: boolean,
    objetivo: number,
    vitoria: boolean
}

// function makeJogo(tart: Personagem, caras: Personagem[], gaivas: Personagem[], itensVida: ItemVida[], blocos: Bloco[], vidas: number){
//     return {tart: Personagem,
//             caras: Personagem[],
//             gaivas: Personagem[],
//             itensVida: ItemVida[],
//             blocos: Bloco[],
//             vidas: number;
// }
// }

export const EXEMPLO_JOGO = {
    tart:TARTARUGA_INICIAL,
    caras:[CARANGUEJO_01_INICIAL, CARANGUEJO_02_INICIAL/*, CARANGUEJO_03_INICIAL*/],
    gaivas:[GAIVOTA_01_INICIAL],
    itensVida:[ItemVida1],
    blocos:[],
    vidas: 3,

    gameOver: false,
    objetivo: LARGURA * 0.7,
    vitoria: false
}

export function colidindo(tart: Personagem, inimigo: Personagem): boolean {
    let distanciaVacaCc = distancia(tart.x, tart.y, inimigo.x, inimigo.y);
    return distanciaVacaCc < (tart.raioDeColisão + inimigo.raioDeColisão) * 1.5;
}

export function atualizaJogo(game: Jogo): Jogo{
    
    function colidindoComAlgum(tart: Personagem, inimigos: Personagem[]): boolean {
        return inimigos.some((inimigo) => colidindo(tart, inimigo));
      }
      
    if (colidindoComAlgum(game.tart, game.gaivas) || colidindoComAlgum(game.tart, game.caras)) {

        if (game.vidas == 1) {
            return { ...game, gameOver: true};
        }

        return { ...game, vidas: game.vidas - 1, tart: TARTARUGA_INICIAL};
      }
    
    if (game.tart.x >= game.objetivo) {
        return {...game, vitoria: true}
    }
    let tartMovido = movePersonagem(game.tart)
    let carasMovidos = game.caras.map(movePersonagem)
    let gaivotasGiradas = game.gaivas.map(giraGaivota)
    let gaivasMovidas = gaivotasGiradas.map(movePersonagem)

   

    return{...game, tart: tartMovido, caras: carasMovidos, gaivas: gaivasMovidas}
}

//---------------------------------

export function desenhaJogo(game: Jogo): Imagem {
    
    if (game.gameOver){
        let imagem = colocarImagem(texto("Perdeu!", "Arial", "40px"), LARGURA/2, ALTURA/2, TELA)
        return imagem
    }

    if (game.vitoria){
        let imagem = colocarImagem(texto("Ganhaste!", "Arial", "40px"), LARGURA/2, ALTURA/2, TELA)
        return imagem
    }

    let imagem = colocarImagem(desenhaTartaruga(game.tart), LARGURA/2, ALTURA/2, FUNDO)
    imagem = colocarImagem(desenhaCaranguejos(game.caras), LARGURA/2, ALTURA/2, imagem)
    imagem = colocarImagem(desenhaGaivotas(game.gaivas), LARGURA/2, ALTURA/2, imagem)

    for (let i = 0; i < game.vidas; i++){
        imagem = colocarImagem(IMG_CORACAO, 50 + (i * larguraImagem(IMG_CORACAO)), 40, imagem)
    }
    return imagem
    //Está quebrado por que as coisas mudaram
    //return colocarImagem(game.dx < 0? IMG_TARTARUGA_OESTE: IMG_TARTARUGA_LESTE, game.x, game.y, TELA);
}

//-----------------------------------------------------------------------------------------------------------


export function trataTeclaJogo(game: Jogo, tecla: String): Jogo {
    if (tecla == "ArrowRight"){
        return {...game, tart:{...game.tart, dx: D_PADRAO}}
    }

    if (tecla == "ArrowLeft"){
        return {...game, tart:{...game.tart, dx: -D_PADRAO}}
    }

    if (tecla == "ArrowUp"){
        return {...game, tart:{...game.tart, dy: -D_PADRAO}}
    }

    if (tecla == "ArrowDown"){
        return {...game, tart:{...game.tart, dy: D_PADRAO}}
    }

    return game
}

export function trataSoltaTeclaJogo(game: Jogo, tecla: String): Jogo {
    if (tecla == "ArrowRight" || tecla == "ArrowLeft"){
        return {...game, tart:{...game.tart, dx: 0}}
    }

    if (tecla == "ArrowUp" || tecla == "ArrowDown"){
        return {...game, tart:{...game.tart, dy: 0}}
    }

    //return {...game, tart:{...game.tart, dx: 0, dy:0}}
  
}