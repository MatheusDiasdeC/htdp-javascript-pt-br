import { testes } from "../../lib/utils";
import { ALTURA, GIRO, LARGURA, LIMITE_BAIXO_TARTARUGA, LIMITE_CIMA_TARTARUGA, LIMITE_ESQUERDA_TARTARUGA } from "./Constantes";
import { TARTARUGA0, TARTARUGA1, TARTARUGA_FIM, TARTARUGA_VIRANDO, makeTartaruga, makeGaivota, movePersonagem, GAIVOTA_01_INICIAL, giraGaivota } from "./Personagens";
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


  //Testes Reais
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


            let novoDy = dy * Math.sin(angulo)
            let novoDx = dx * Math.cos(angulo)

            expect(giraGaivota(makeGaivota(50, 50, dx, dy))).toStrictEqual(makeGaivota(50, 50, novoDx, novoDy))
        })
    })
})

