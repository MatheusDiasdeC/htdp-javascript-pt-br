import { Imagem, alturaImagem, colocarImagem, folhaTransparente, larguraImagem, rotacionar } from "../../lib/image";
import { testes } from "../../lib/utils";
import {ALTURA, D_PADRAO, GIRO, IMG_CARANGUEJO, IMG_GAIVOTA_LESTE, IMG_GAIVOTA_OESTE, IMG_TARTARUGA_LESTE, LARGURA, LIMITE_BAIXO_CARANGUEJO, LIMITE_BAIXO_GAIVOTA, LIMITE_BAIXO_TARTARUGA, 
        LIMITE_CIMA_CARANGUEJO, LIMITE_CIMA_GAIVOTA, LIMITE_CIMA_TARTARUGA, LIMITE_DIREITA_CARANGUEJO,
        LIMITE_DIREITA_GAIVOTA, LIMITE_DIREITA_TARTARUGA, LIMITE_ESQUERDA_CARANGUEJO, LIMITE_ESQUERDA_GAIVOTA,
        LIMITE_ESQUERDA_TARTARUGA, 
        TELA, 
        Y_INICIAL_CARANGUEJO, 
        Y_INICIAL_GAIVOTA, 
        Y_INICIAL_TARTARUGA} from "./Constantes";
import { desenhaJogo, Jogo } from "./Jogo";

//interface genérica para todos os personagens. Vai substituitir todas as coisas que se movem.
export interface Personagem {
    x: number,
    y: number,
    dx: number,
    dy: number,
    
    limiteCima: number,
    limiteBaixo: number,
    limiteEsquerdo: number,
    limiteDireito: number,

    raioDeColisão: number
}

//-----------------------------------------------------------------------------------------------------------
//EXEMPLOS
//const TART_INICIAL = {x: LIMITE_ESQUERDA_TARTARUGA, y: ALTURA/2, dx: 0, dy: 0}

export const TART_INICIAL = {
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

export const CARA_INICIAL = {
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

export const GAIVOTA_INICIAL = {
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


//-----------------------------------------------------------------------------------------------------
//Cria um "objeto" T (Tartaruga), C (Caranguejo) e G (Gaivota)
export function makeTartaruga(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x,
            y: y,
            dx: dx,
            dy: dy,

            limiteCima: LIMITE_CIMA_TARTARUGA,
            limiteBaixo: LIMITE_BAIXO_TARTARUGA,
            limiteEsquerdo: LIMITE_ESQUERDA_TARTARUGA,
            limiteDireito: LIMITE_DIREITA_TARTARUGA,
            
            raioDeColisão: (alturaImagem(IMG_TARTARUGA_LESTE) + larguraImagem(IMG_TARTARUGA_LESTE)) / 2 / 3
    }
}

export function makeCaranguejo(x: number, y: number, dx: number, dy: number): Personagem {
    return {x: x,
            y: y,
            dx: dx,
            dy: dy,

            limiteCima: LIMITE_CIMA_CARANGUEJO,
            limiteBaixo: LIMITE_BAIXO_CARANGUEJO,
            limiteEsquerdo: LIMITE_ESQUERDA_CARANGUEJO,
            limiteDireito: LIMITE_DIREITA_CARANGUEJO,

            raioDeColisão: (alturaImagem(IMG_CARANGUEJO) + larguraImagem(IMG_CARANGUEJO)) / 2 / 3
    }
}

export function makeGaivota(x: number, y: number, dx: number, dy: number): Personagem {
    return { x: x,
            y: y,
            dx: dx,
            dy: dy,
            
            limiteCima: LIMITE_CIMA_GAIVOTA,
            limiteBaixo: LIMITE_BAIXO_GAIVOTA,
            limiteEsquerdo: LIMITE_ESQUERDA_GAIVOTA,
            limiteDireito: LIMITE_DIREITA_GAIVOTA,

            raioDeColisão: (alturaImagem(IMG_GAIVOTA_LESTE) + larguraImagem(IMG_GAIVOTA_LESTE)) / 2 / 3
    }
}

//Posições Iniciais de T
export const TARTARUGA_INICIAL = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 0, 0)
    //Após 1 Tic
export const TARTARUGA_INICIAL2 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA + D_PADRAO, Y_INICIAL_TARTARUGA, D_PADRAO, 0)

export const TARTARUGA0 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 3, 4)
export const TARTARUGA1 = makeTartaruga(LIMITE_ESQUERDA_TARTARUGA + 3, Y_INICIAL_TARTARUGA + 4, 3, 4)

//Posições Iniciais de C
export const CARANGUEJO_01_INICIAL = makeCaranguejo(250 + larguraImagem(IMG_CARANGUEJO), Y_INICIAL_CARANGUEJO, 0, D_PADRAO)
export const Caranguejo_01_POSTERIOR = makeCaranguejo(2 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_CARANGUEJO, 0, D_PADRAO)

export const CARANGUEJO_02_INICIAL = makeCaranguejo(450 + larguraImagem(IMG_CARANGUEJO), Y_INICIAL_CARANGUEJO - 400, 0, D_PADRAO)
export const Caranguejo_02_POSTERIOR = makeCaranguejo(3 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_CARANGUEJO, 0, D_PADRAO)

/*export const CARANGUEJO_03_INICIAL = {x: LARGURA / 5, y: Y_INICIAL_CARANGUEJO, dx: D_PADRAO, dy: 0,
                                      limiteCima: LIMITE_CIMA_CARANGUEJO, limiteBaixo: ALTURA - larguraImagem(IMG_CARANGUEJO) / 2,
                                      limiteEsquerdo: LIMITE_ESQUERDA_CARANGUEJO, limiteDireito: LIMITE_DIREITA_CARANGUEJO}
    //makeCaranguejo(LARGURA / 5, Y_INICIAL_CARANGUEJO, D_PADRAO, 0)
export const Caranguejo_03_POSTERIOR = makeCaranguejo(LARGURA / 5 + D_PADRAO, Y_INICIAL_CARANGUEJO, D_PADRAO, 0)*/

//Posições Iniciais de G
export const GAIVOTA_01_INICIAL = makeGaivota(2.8 * (LARGURA / 5), Y_INICIAL_GAIVOTA, 0, D_PADRAO)
export const GAIVOTA_01_POSTERIOR = makeGaivota(4 * (LARGURA / 5) + D_PADRAO, Y_INICIAL_GAIVOTA, 0, D_PADRAO)


//-----------------------------------------------------------------------------------------------------------


//Movimento de T ao chegar no final
export const TARTARUGA_FIM = makeTartaruga(LIMITE_DIREITA_TARTARUGA + 1, LIMITE_BAIXO_TARTARUGA, 3, 0)
export const TARTARUGA_VIRANDO = makeTartaruga(LIMITE_DIREITA_TARTARUGA, LIMITE_BAIXO_TARTARUGA, -3, 0)
export const TARTARUGA_VOLTANDO = makeTartaruga(LARGURA / 2, LIMITE_BAIXO_TARTARUGA, -3, 0)

//Movimento de C ao chegar no final
export const CARANGUEJO_VERTICAL_01_FIM = makeCaranguejo(2 * (LARGURA / 5), LIMITE_BAIXO_TARTARUGA, 3, 0)
export const CARANGUEJO_VERTICAL_01_RETORNO = makeCaranguejo(2 * (LARGURA / 5), LIMITE_BAIXO_CARANGUEJO, 0, -D_PADRAO)

export const CARANGUEJO_VERTICAL_02_FIM = makeCaranguejo(3 * (LARGURA / 5), LIMITE_BAIXO_TARTARUGA, 3, 0)
export const CARANGUEJO_VERTICAL_02_RETORNO = makeCaranguejo(3 * (LARGURA / 5), LIMITE_BAIXO_CARANGUEJO, 0, -D_PADRAO)

//const CARANGUEJO_03_FIM = makeCaranguejo(LARGURA / 5, Y_INICIAL_CARANGUEJO, D_PADRAO, 0)
export const CARANGUEJO_03_RETORNO = makeCaranguejo(LARGURA / 5, Y_INICIAL_CARANGUEJO, -D_PADRAO, 0)


//Colocar os Testes
export function movePersonagem(pessoa: Personagem): Personagem {
    if (pessoa.x > pessoa.limiteDireito) {
        return { ...pessoa, x: pessoa.limiteDireito, dx: -pessoa.dx }
    } //... -> copia o objeto que vc quer copiar, e tudo o que vem depois da vírgula é o que você quer modificar
    if (pessoa.x < pessoa.limiteEsquerdo) {
        return { ...pessoa, x: pessoa.limiteEsquerdo, dx: -pessoa.dx }
    }
    if (pessoa.y > pessoa.limiteBaixo) {
        return { ...pessoa, y: pessoa.limiteBaixo, dy: -pessoa.dy }
    }
    if (pessoa.y < pessoa.limiteCima) {
        return { ...pessoa, y: pessoa.limiteCima, dy: -pessoa.dy }
    }
    return { ...pessoa, x: pessoa.x + pessoa.dx, y: pessoa.y + pessoa.dy }
}

export function desenhaTartaruga(pessoa: Personagem): Imagem{

    let folha = folhaTransparente(LARGURA, ALTURA)
    let angulo = Math.atan2(pessoa.dy , pessoa.dx)
    angulo  = angulo * (180/Math.PI)

    let imagemRotacionda = rotacionar(IMG_TARTARUGA_LESTE, angulo)
    return colocarImagem(imagemRotacionda, pessoa.x, pessoa.y, folha)
}

export function desenhaCaranguejos(pessoa: Personagem[]): Imagem{

    let folha = folhaTransparente(LARGURA, ALTURA)

    for (let cc of pessoa){

        folha = colocarImagem(IMG_CARANGUEJO, cc.x, cc.y, folha)
    }

    return folha
    //colocarImagem(IMG_CARANGUEJO, pessoa.x, pessoa.y, folha)
}

export function giraGaivota(pessoa: Personagem): Personagem{

    let angulo = Math.atan2(pessoa.dy , pessoa.dx)
    //angulo  = angulo * (180/Math.PI)

    angulo = angulo - GIRO * (0.0175)


    let novoDy = D_PADRAO * Math.sin(angulo)
    let novoDx = D_PADRAO * Math.cos(angulo)

    return {...pessoa, dx : novoDx, dy : novoDy}
}

export function desenhaGaivotas(pessoa: Personagem[]): Imagem{

    let folha = folhaTransparente(LARGURA, ALTURA)

    for (let cc of pessoa){

        folha = colocarImagem(IMG_GAIVOTA_OESTE, cc.x, cc.y, folha)
    }

    return folha
}


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
