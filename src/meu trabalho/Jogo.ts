import { Imagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem, sobrepor } from "../../lib/image"
import { reactor } from "../../lib/universe";
import { testes } from "../../lib/utils";
import { ALTURA, D_PADRAO, IMG_CARANGUEJO, IMG_TARTARUGA_LESTE, IMG_TARTARUGA_OESTE, LARGURA, LIMITE_BAIXO_CARANGUEJO, LIMITE_BAIXO_GAIVOTA, LIMITE_BAIXO_TARTARUGA, LIMITE_CIMA_CARANGUEJO, LIMITE_CIMA_GAIVOTA, LIMITE_CIMA_TARTARUGA, LIMITE_DIREITA_CARANGUEJO, LIMITE_DIREITA_GAIVOTA, LIMITE_DIREITA_TARTARUGA, LIMITE_ESQUERDA_CARANGUEJO, LIMITE_ESQUERDA_GAIVOTA, LIMITE_ESQUERDA_TARTARUGA, TELA, Y_INICIAL_CARANGUEJO, Y_INICIAL_GAIVOTA, Y_INICIAL_TARTARUGA } from "./Constantes";
import { CARANGUEJO_01_INICIAL, CARANGUEJO_02_INICIAL, /*CARANGUEJO_03_INICIAL,*/ GAIVOTA_01_INICIAL, Personagem, TARTARUGA_INICIAL, desenhaCaranguejos, desenhaGaivotas, desenhaTartaruga, giraGaivota, movePersonagem } from "./Personagens";


//Coisas para fazer o trabalho funcionar:
// - Como ativar o servidor -> readme
// - Como fazer os commits -> Nessa barra ateral -> Ícone que parece um grafo -> FAÇA os COMMITS!



//--Constantes de Posição--
//Ver Imagem na Tela (Teste)
//IMG_CARANGUEJO.desenha()

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
    vidas: number
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
    vidas: 3
}

export function atualizaJogo(game: Jogo): Jogo{
    let tartMovido = movePersonagem(game.tart)
    let carasMovidos = game.caras.map(movePersonagem)
    let gaivotasGiradas = game.gaivas.map(giraGaivota)
    let gaivasMovidas = gaivotasGiradas.map(movePersonagem)

    return{...game, tart: tartMovido, caras: carasMovidos, gaivas: gaivasMovidas}
}

//---------------------------------

export function desenhaJogo(game: Jogo): Imagem {
    
    let layerTartaruga = colocarImagem(desenhaTartaruga(game.tart), LARGURA/2, ALTURA/2, TELA)
    let layerCaranguejos = colocarImagem(desenhaCaranguejos(game.caras), LARGURA/2, ALTURA/2, layerTartaruga)
    let layerGaivotas = colocarImagem(desenhaGaivotas(game.gaivas), LARGURA/2, ALTURA/2, layerCaranguejos)
    return layerGaivotas
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