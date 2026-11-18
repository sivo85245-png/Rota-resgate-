# Rota de Resgate

Simulador interativo que compara dois algoritmos de busca de caminhos, **Dijkstra** e **A\***, em uma missão de resgate. Tu podes editar o terreno e acompanhar como cada algoritmo encontra uma rota até a pessoa que precisa de ajuda.

## Como executar

1. Baixa o projeto pelo botão **Code → Download ZIP** do GitHub.
2. Extrai o ZIP e abre a pasta do projeto.
3. Dá dois cliques em `index.html` para abrir o simulador no navegador.
4. Clica em **Comparar rotas** para iniciar a animação.

Se já estiveres na pasta do projeto pelo terminal do VS Code, podes abrir o simulador com `start .\index.html` no PowerShell. O navegador carrega o `app.js` automaticamente.

## Como interpretar o mapa

- **Azul** indica as células exploradas durante a busca.
- **Amarelo** indica a rota encontrada.
- Cada passo na **estrada** custa 1 ponto. Cada passo na **lama** custa 5.

O objetivo é chegar ao destino com o **menor custo total**. Por isso, uma rota com mais passos pode ser a melhor escolha. Por exemplo, quatro passos na estrada custam menos do que um único passo na lama.

## Dijkstra e A*

| Algoritmo | Como escolhe a próxima célula |
| --- | --- |
| **Dijkstra** | Dá prioridade à célula com menor custo acumulado desde a partida. |
| **A\*** | Soma o custo acumulado a uma estimativa de quanto falta para chegar ao destino. |

## Experimento

Executa a comparação e observa o custo da rota e o número de células exploradas. Depois, seleciona **Lama**, pinta uma faixa sobre parte da rota amarela e executa novamente. Os algoritmos atravessaram a lama ou encontraram um desvio mais barato?

## Tecnologias e créditos

Projeto educacional em **HTML, CSS e JavaScript** para explorar algoritmos de busca em grafos. A versão inicial foi gerada com auxílio de inteligência artificial.
