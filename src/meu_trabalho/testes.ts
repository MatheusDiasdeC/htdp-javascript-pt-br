import { testes } from "../../lib/utils";
import { ALTURA, D_PADRAO, GIRO, LARGURA, LIMITE_BAIXO_TARTARUGA, LIMITE_CIMA_TARTARUGA, LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA } from "./Constantes";
import { EXEMPLO_JOGO, colidindo, makeJogo, trataSoltaTeclaJogo, trataTeclaJogo } from "./Jogo";
import { TARTARUGA0, TARTARUGA1, TARTARUGA_FIM, TARTARUGA_VIRANDO, makeTartaruga, makeGaivota, movePersonagem, GAIVOTA_01_INICIAL, giraGaivota, TARTARUGA_INICIAL, CARANGUEJO_01_INICIAL, CARANGUEJO_02_INICIAL } from "./Personagens";
import { distancia } from "./Utilidades";

testes(() => {
    describe("testes distancia", () => {
      test("teste 1", () => {
        expect(distancia(0, 0, 3, 4)).toStrictEqual(5);
      });
      test("teste 2", () => {
        expect(distancia(1, 2, 4, 6)).toStrictEqual(5);
      });
    });
  });

  testes(() => {
    describe('testes de movePersonagem', () => {
            test('move personagem inicial', () => {
                expect(movePersonagem(TARTARUGA0)).toStrictEqual(TARTARUGA1);
            });
            test('move personagem limite direito', () => {
                expect(movePersonagem(TARTARUGA_FIM)).toStrictEqual(TARTARUGA_VIRANDO);
            });
            test('move vaca limite esquerdo', () => {
                expect(movePersonagem(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA - 1, ALTURA / 2, -3, 0)))
                    .toStrictEqual(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, ALTURA / 2, 3, 0));
            });
            test('move vaca limite baixo', () => {
                expect(movePersonagem(makeTartaruga(LARGURA / 2, LIMITE_BAIXO_TARTARUGA+1, 0, 3)))
                    .toStrictEqual(makeTartaruga(LARGURA/2, LIMITE_BAIXO_TARTARUGA, 0, -3));
            });
            test('move vaca limite cima', () => {
                expect(movePersonagem(makeTartaruga(LARGURA/2, LIMITE_CIMA_TARTARUGA-1, 0, -3)))
                    .toStrictEqual(makeTartaruga(LARGURA/2, LIMITE_CIMA_TARTARUGA, 0, 3));
            });
        });
})

testes(() => {
    describe("Testando giraGaivota", () => {
        test("gira horario", () => {
            let dx = 1
            let dy = 1

            let angulo = Math.atan2(dy , dx)

            angulo = angulo - GIRO * (0.0175)


            let novoDy = D_PADRAO * Math.sin(angulo)
            let novoDx = D_PADRAO * Math.cos(angulo)

            expect(giraGaivota(makeGaivota(50, 50, dx, dy))).toStrictEqual(makeGaivota(50, 50, novoDx, novoDy))
        })
    })
})

testes(() => {
    describe("Testando colidindo", () => {
        test("bate", () => {
            const T1 = makeTartaruga(10, 20, D_PADRAO, D_PADRAO)
            const T2 = makeTartaruga(10, 20, D_PADRAO, D_PADRAO)

            expect(colidindo(T1, T2)).toStrictEqual(true)
        })

        test("não bate", () => {
            const T1 = makeTartaruga(10, 20, D_PADRAO, D_PADRAO)
            const T2 = GAIVOTA_01_INICIAL

            expect(colidindo(T1, T2)).toStrictEqual(false)
        })
    })
})

testes(() => {
    describe("Testando trataTeclaJogo", () => {
        test("Direita", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, D_PADRAO, 0), [], [], 3)
            const string = "ArrowRight"

            expect(trataTeclaJogo(jog, string)).toStrictEqual(newJog) 
        })

        test("Esquerda", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, -D_PADRAO, 0), [], [], 3)
            const string = "ArrowLeft"

            expect(trataTeclaJogo(jog, string)).toStrictEqual(newJog)   
        })

        test("Cima", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 0, -D_PADRAO), [], [], 3)
            const string = "ArrowUp"

            expect(trataTeclaJogo(jog, string)).toStrictEqual(newJog)  
        })

        test("Baixo", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 0, D_PADRAO), [], [], 3)
            const string = "ArrowDown"

            expect(trataTeclaJogo(jog, string)).toStrictEqual(newJog)  
        })
    })
})

testes(() => {
    describe("Testando trataSoltaTeclaJogo", () => {
        test("Horizontal", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 0, 0), [], [], 3)
            const string = "ArrowRight" || "ArrowLeft"

            expect(trataSoltaTeclaJogo(jog, string)).toStrictEqual(newJog)
            
        })

        test("Vertical", () => {
            const jog = makeJogo(TARTARUGA_INICIAL, [], [], 3)
            const newJog = makeJogo(makeTartaruga(LIMITE_ESQUERDA_TARTARUGA, Y_INICIAL_TARTARUGA, 0, 0), [], [], 3)
            const string = "ArrowUp" || "ArrowDown"

            expect(trataSoltaTeclaJogo(jog, string)).toStrictEqual(newJog)
            
        })
    })
})