import { reactor } from "../../lib/universe"
import {EXEMPLO_JOGO, atualizaJogo, desenhaJogo, trataTeclaJogo} from "./Jogo"

function main() {
    reactor(EXEMPLO_JOGO,
        {
            aCadaTick: atualizaJogo,
            desenhar: desenhaJogo,
            quandoTecla: trataTeclaJogo,
        })
}

main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html