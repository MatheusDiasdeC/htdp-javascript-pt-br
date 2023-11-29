import { reactor } from "../../lib/universe"
import {EXEMPLO_JOGO, atualizaJogo, desenhaJogo, trataSoltaTeclaJogo, trataTeclaJogo} from "./Jogo"

function main() {
    reactor(EXEMPLO_JOGO,
        {
            aCadaTick: atualizaJogo,
            desenhar: desenhaJogo,
            quandoTecla: trataTeclaJogo,
            quandoSoltaTecla: trataSoltaTeclaJogo,
            modoDebug: false
        })
}

main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html