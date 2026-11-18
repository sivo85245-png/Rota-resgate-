// Busca em quatro direções. O custo é o do terreno de chegada.
function buscar(mapa, largura, inicio, alvo, usarHeuristica) {
  const distancia = Array(mapa.length).fill(Infinity);
  const anterior = Array(mapa.length).fill(-1);
  const pendentes = new Set([inicio]);
  const visitados = [];
  distancia[inicio] = 0;
  const estimativa = i => usarHeuristica
    ? Math.abs(i % largura - alvo % largura) + Math.abs(Math.floor(i / largura) - Math.floor(alvo / largura))
    : 0;
  while (pendentes.size) {
    let atual, menor = Infinity;
    for (const i of pendentes) {
      const prioridade = distancia[i] + estimativa(i);
      if (prioridade < menor || (prioridade === menor && estimativa(i) < estimativa(atual))) {
        atual = i;
        menor = prioridade;
      }
    }
    pendentes.delete(atual);
    visitados.push(atual);
    if (atual === alvo) {
      const rota = [];
      for (let i = alvo; i !== -1; i = anterior[i]) rota.push(i);
      return {rota: rota.reverse(), visitados, custo: distancia[alvo]};
    }
    const vizinhos = [atual - largura, atual + largura];
    if (atual % largura > 0) vizinhos.push(atual - 1);
    if (atual % largura < largura - 1) vizinhos.push(atual + 1);
    for (const i of vizinhos) {
      if (i < 0 || i >= mapa.length || mapa[i] === 0) continue;
      const custo = distancia[atual] + mapa[i];
      if (custo >= distancia[i]) continue;
      distancia[i] = custo;
      anterior[i] = atual;
      pendentes.add(i);
    }
  }
  return {rota: [], visitados, custo: Infinity};
}
if (typeof module !== 'undefined') module.exports = buscar;
