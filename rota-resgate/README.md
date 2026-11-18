# Rota de Resgate

Laboratório visual de algoritmos de busca em JavaScript. Dijkstra e A* recebem o mesmo mapa e procuram a rota de menor custo entre a base e a pessoa. Uma estrada custa 1 por movimento, lama custa 5 e um bloqueio impede a passagem.

## Demonstração

Abra **index.html** em um navegador moderno e clique em **Comparar rotas**. Não há instalação, servidor ou dependências. Observe a área azul explorada e a rota amarela. O total de células mede o esforço de busca neste mapa.

Experimente pintar lama no caminho direto. Uma rota mais longa pode custar menos. Depois cerque a pessoa com bloqueios e execute novamente para testar o caso sem saída. Use **Restaurar cenário** para repetir o experimento inicial.

## Como funciona

Os movimentos são horizontais e verticais. Dijkstra prioriza o custo acumulado. A* soma a esse custo a distância Manhattan até a pessoa. Cada movimento custa pelo menos 1, então essa estimativa é um limite inferior. Ambos encontram um caminho de custo mínimo quando existe uma rota. Empates podem produzir caminhos diferentes.

O motor guarda a célula anterior de cada posição para reconstruir a rota. A fronteira é um conjunto percorrido para escolher a menor prioridade. Esta implementação favorece a leitura do algoritmo em mapas pequenos.

## Arquivos

- index.html e estilo.css — interface e apresentação
- motor.js — busca independente da interface
- app.js — edição do mapa, animação e indicadores
- teste.js — verificações do motor. Execute com Node.js usando `node teste.js`.

## Desenvolvimento

A versão inicial foi gerada com o ChatGPT como projeto de estudo de algoritmos.
