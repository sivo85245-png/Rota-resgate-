const colunas = 24, linhas = 16, lado = 28;
let mapa, base, alvo, quadro, resultados = [], passo = 0, pintura = false;
const paineis = ['Dijkstra', 'A*'].map(nome => {
  const artigo = document.createElement('article');
  artigo.innerHTML = '<h2></h2><canvas></canvas><output></output>';
  artigo.querySelector('h2').textContent = nome;
  document.querySelector('#paineis').append(artigo);
  const tela = artigo.querySelector('canvas');
  tela.width = colunas * lado;
  tela.height = linhas * lado;
  tela.setAttribute('aria-label', 'Mapa de terreno para ' + nome);
  tela.onpointerdown = e => { pintura = true; tela.setPointerCapture(e.pointerId); pintar(e); };
  tela.onpointermove = e => { if (pintura) pintar(e); };
  tela.onpointerup = tela.onpointercancel = () => { pintura = false; };
  return {tela, saida: artigo.querySelector('output')};
});
const relato = document.querySelector('#relato');
function desenhar() {
  paineis.forEach(({tela, saida}, k) => {
    const ctx = tela.getContext('2d');
    const r = resultados[k];
    const vistos = new Set(r?.visitados.slice(0, passo));
    const terminou = r && passo >= r.visitados.length;
    const rota = new Set(terminou ? r.rota : []);
    mapa.forEach((peso, i) => {
      const x = (i % colunas) * lado, y = Math.floor(i / colunas) * lado;
      ctx.fillStyle = '#13242d'; ctx.fillRect(x,y,lado,lado);
      ctx.fillStyle = peso === 0 ? '#405564' : peso === 5 ? '#ab7650' : '#213e44';
      ctx.fillRect(x+1,y+1,lado-2,lado-2);
      if (vistos.has(i)) {ctx.fillStyle = '#58b7cf'; ctx.fillRect(x+8,y+8,12,12);}
      if (rota.has(i)) {ctx.fillStyle = '#ffcf63'; ctx.fillRect(x+4,y+4,lado-8,lado-8);}
      if (i === base || i === alvo) {
        ctx.fillStyle = i === base ? '#a4f3c7' : '#ffae9f'; ctx.fillRect(x+1,y+1,lado-2,lado-2);
        ctx.fillStyle = '#09212a'; ctx.font = 'bold 19px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(i === base ? 'B' : 'P', x+lado/2, y+21);
      }
    });
    saida.textContent = r ? vistos.size+' células exploradas'+(terminou ? (r.rota.length ? ' · custo '+r.custo+' · '+(r.rota.length-1)+' passos' : ' · sem rota') : '') : 'Aguardando simulação';
  });
}
function limparBusca() { cancelAnimationFrame(quadro); resultados = []; passo = 0; }
function restaurar() {
  limparBusca(); mapa = Array(colunas*linhas).fill(1); base = 8*colunas+2; alvo = 8*colunas+21;
  for(let y=2;y<15;y++) if(y!==8 && y!==4) mapa[y*colunas+10]=0;
  for(let y=6;y<=10;y++) for(let x=11;x<=17;x++) mapa[y*colunas+x]=5;
  relato.textContent='Clica ou arrasta em qualquer mapa para editar os dois.'; desenhar();
}
function pintar(e) {
  const rect=e.currentTarget.getBoundingClientRect();
  const x=Math.floor((e.clientX-rect.left)*colunas/rect.width);
  const y=Math.floor((e.clientY-rect.top)*linhas/rect.height);
  if(x<0 || y<0 || x>=colunas || y>=linhas) return;
  const i=y*colunas+x, modo=document.querySelector('#pincel').value;
  if(i===base || i===alvo) return;
  limparBusca();
  if(modo==='base' || modo==='alvo'){
    mapa[i]=1;
    if(modo==='base') base=i; else alvo=i;
  } else mapa[i]=Number(modo);
  relato.textContent='Terreno alterado. Compara as rotas novamente.'; desenhar();
}
function comparar(){
  limparBusca(); resultados=[false,true].map(h=>buscar(mapa,colunas,base,alvo,h));
  relato.textContent='Explorando o terreno…';
  let inicio;
  function animar(agora){
    inicio ??= agora; passo=Math.floor((agora-inicio)/12)+1; desenhar();
    if(resultados.some(r=>passo<r.visitados.length)) quadro=requestAnimationFrame(animar);
    else {
      const [d,a]=resultados;
      relato.textContent=d.rota.length
        ? 'Mesmo custo mínimo de '+d.custo+'. Dijkstra explorou '+d.visitados.length+' células e A* explorou '+a.visitados.length+'.'
        : 'A pessoa ficou isolada. Abre uma passagem com a ferramenta Estrada.';
    }
  }
  quadro=requestAnimationFrame(animar);
}
document.querySelector('#iniciar').onclick=comparar;
document.querySelector('#restaurar').onclick=restaurar;
restaurar();
