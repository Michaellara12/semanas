/* Integridad editorial: todas las fichas, enlaces internos y fuentes resolubles. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const sandbox={}; sandbox.window=sandbox;
vm.createContext(sandbox);
for(const file of ['data','ley-texto','ley-analisis']) vm.runInContext(fs.readFileSync(path.join(root,'js',file+'.js'),'utf8'),sandbox);
const S=sandbox.SEMANAS;
assert.equal(S.ARTICULOS.length,95);
assert.equal(Object.keys(S.LEYTEXTO).length,95);
assert.equal(Object.keys(S.ANALISIS).length,95);
assert.equal(Object.keys(S.LECTURA_CLARA).length,95);
assert.equal(new Set(S.SOURCES.map(s=>s.k)).size,S.SOURCES.length,'Claves bibliográficas duplicadas');
for(let n=1;n<=95;n++){
  const a=S.ANALISIS[n];
  assert.ok(S.LECTURA_CLARA[n]?.length>65,`Art. ${n}: falta primera lectura sencilla`);
  assert.ok(a&&S.LEYTEXTO[n]?.x,`Artículo ${n} incompleto`);
  for(const field of ['q','l','s','f','c','e','v']) assert.ok(a[field]?.length>20,`Art. ${n}: falta ${field}`);
  assert.ok(a.r.length,`Art. ${n}: sin conexiones`);
  for(const related of a.r) assert.ok(related!==n&&S.ANALISIS[related],`Art. ${n}: enlace ${related} inválido`);
  for(const key of a.k) assert.ok(S.SRC[key]&&S.LEGAL_SOURCES[key],`Art. ${n}: fuente ${key} sin ficha`);
  assert.ok(S.LEYPAGES[n]>=1&&S.LEYPAGES[n]<=50,`Art. ${n}: página no comprobada`);
}
assert.match(S.ARTICULOS.find(a=>a.n===93).t,/diferencial/);
assert.match(S.LEYTEXTO[93].h,/PUEBLOS INDIGENAS/);
assert.doesNotMatch(S.LEYTEXTO[92].x,/Todas las menciones específicas/,'Art. 93 duplicado dentro del 92');
assert.equal(S.LEYPAGES[93],49);
assert.doesNotMatch(S.ARTICULOS.find(a=>a.n===82).s,/prescriben las mesadas/i);
assert.match(S.ARTICULOS.find(a=>a.n===10).s,/nómina/);
for(const html of ['reforma/index.html']){
  const text=fs.readFileSync(path.join(root,html),'utf8');
  for(const [,key] of text.matchAll(/data-ref="([^"]+)"/g)) assert.ok(S.SRC[key],`Cita huérfana: ${key}`);
  for(const [,src] of text.matchAll(/src="(\.\.\/assets\/[^"?]+)"/g)) assert.ok(fs.existsSync(path.resolve(root,path.dirname(html),src)),`Imagen inexistente: ${src}`);
}
assert.ok(fs.statSync(path.join(root,S.PDFLOCAL.ley2381pdf)).size>100000,'PDF vacío o incompleto');
console.log('OK: 95 análisis, 95 textos, páginas verificadas, fuentes y relaciones válidas.');
