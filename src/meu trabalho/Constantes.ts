import { Imagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem } from "../../lib/image"
import imgTartarugaUrl from "./Tartaruga.png";
import imgCaranguejoUrl from "./Caranguejo.png";
import imgGaivotaUrl from "./Gaivota.png";
import imgCoracaoUrl from "./Coracao.png";
import imgPraia1 from "./Praia1.png";
import imgPraia2 from "./Praia2.png";

//Criação da Tela
export const [LARGURA, ALTURA] = [1400, 600]
export const TELA = cenaVazia(LARGURA, ALTURA)


//-----------------------------------------------------------------------------------------------------------

//-- Criar Imagens --
//Criar Tartaruga
export const IMG_TARTARUGA_LESTE = carregarImagem(imgTartarugaUrl, 110, 100)
export const IMG_TARTARUGA_OESTE = espelhar(IMG_TARTARUGA_LESTE)

//Criar Caranguejo
export const IMG_CARANGUEJO = carregarImagem(imgCaranguejoUrl, 110, 100)

//Criar Gaivota
export const IMG_GAIVOTA_OESTE = carregarImagem(imgGaivotaUrl, 100, 100)
export const IMG_GAIVOTA_LESTE = espelhar(IMG_GAIVOTA_OESTE)

//Criar Coração
export const  IMG_CORACAO = carregarImagem(imgCoracaoUrl, 100, 100)

//Criar Praia
export const IMG_PRAIA = carregarImagem(imgPraia1, 1400, 600)
export const IMG_PRAIA_TRUE = espelhar(IMG_PRAIA)
//export const IMG_PRAIA = carregarImagem(imgPraia2, 1400, 600)

export const FUNDO = colocarImagem(IMG_PRAIA_TRUE, 700, 300, TELA)
//-----------------------------------------------------------------------------------------------------------

// -- Posição Inicial e Limites dos Personagens
//Altura Inicial de Tartaruga
export const Y_INICIAL_TARTARUGA = ALTURA / 2

//Altura Inicial de Caranguejo
export const Y_INICIAL_CARANGUEJO = 4 * (ALTURA / 5)

//Altura Inicial de Gaivota
export const Y_INICIAL_GAIVOTA = 2.2 * (ALTURA / 5)

//Limites da Tartaruga
export const LIMITE_ESQUERDA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2
export const LIMITE_DIREITA_TARTARUGA = LARGURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
export const LIMITE_BAIXO_TARTARUGA = ALTURA - larguraImagem(IMG_TARTARUGA_LESTE) / 2
export const LIMITE_CIMA_TARTARUGA = 0 + larguraImagem(IMG_TARTARUGA_LESTE) / 2

//Limites dos Caranguejos
export const LIMITE_ESQUERDA_CARANGUEJO = 100 + larguraImagem(IMG_CARANGUEJO)
export const LIMITE_DIREITA_CARANGUEJO = LARGURA - 2 * (larguraImagem(IMG_CARANGUEJO))
export const LIMITE_BAIXO_CARANGUEJO = ALTURA - 2 * (larguraImagem(IMG_CARANGUEJO))
export const LIMITE_CIMA_CARANGUEJO = 0 + larguraImagem(IMG_CARANGUEJO)

//Limites das Gaivotas
export const LIMITE_ESQUERDA_GAIVOTA = 0 + larguraImagem(IMG_GAIVOTA_LESTE) / 2
export const LIMITE_DIREITA_GAIVOTA = LARGURA - larguraImagem(IMG_GAIVOTA_LESTE) / 2
export const LIMITE_BAIXO_GAIVOTA = ALTURA - 2 * (larguraImagem(IMG_GAIVOTA_LESTE))
export const LIMITE_CIMA_GAIVOTA = 0 + larguraImagem(IMG_GAIVOTA_LESTE)

//Velocidade Inicial
export const D_PADRAO = 3

//Ângulo da Gaivota -> Quanto maior, menor o raio
export const GIRO = 1.25

larguraImagem(IMG_TARTARUGA_LESTE) 