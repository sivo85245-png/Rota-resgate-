const assert = require('node:assert/strict');
const buscar = require('./motor.js');
for (const heuristica of [false,true]) {
  const r = buscar([1,5,1,1,1,1],3,0,2,heuristica);
  assert.deepEqual(r.rota,[0,3,4,5,2]);
  assert.equal(r.custo,4);
  assert.equal(buscar([1,0,1],3,0,2,heuristica).rota.length,0);
  assert.equal(buscar([1],1,0,0,heuristica).custo,0);
  assert.equal(buscar([0,1,1,0],2,1,2,heuristica).custo,Infinity);
}
console.log('Verificações concluídas para Dijkstra e A*.');
